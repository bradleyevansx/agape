import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/database.types";

interface BudgetAutoSaveProps {
  budgetEntryGroups: Tables<"budgetEntryGroup">[];
  budgetEntries: Tables<"budgetEntry">[];
  budgetGroupId: string;
  isLoading: boolean;
  userIds: string[];
}

const BudgetAutoSaveContext = createContext<BudgetAutoSaveProps>({
  budgetEntryGroups: [],
  budgetEntries: [],
  budgetGroupId: "",
  isLoading: false,
  userIds: [],
});

export const useBudgetAutoSave = () => useContext(BudgetAutoSaveContext);

interface BudgetAutoSaveProviderProps {
  children: React.ReactNode;
  budgetGroupId: string;
}

export const BudgetAutoSaveProvider: React.FC<BudgetAutoSaveProviderProps> = ({
  children,
  budgetGroupId,
}) => {
  const [partnerId, setPartnerId] = useState<string[]>([]);
  const supabase = createClientComponentClient();
  const [budgetEntryGroups, setBudgetEntryGroups] = useState<
    Tables<"budgetEntryGroup">[]
  >([]);
  const [budgetEntries, setBudgetEntries] = useState<Tables<"budgetEntry">[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: entryGroupsData, error: entryGroupsError } = await supabase
        .from("budgetEntryGroup")
        .select("*")
        .eq("budgetGroupId", budgetGroupId);
      if (!entryGroupsError) {
        setBudgetEntryGroups(entryGroupsData ?? []);
      }

      const { data: relationship, error: relationshipErorr } = await supabase
        .from("relationship")
        .select("*")
        .single<Tables<"relationship">>();

      if (!relationshipErorr) {
        setPartnerId(relationship.userIds);
      }

      const { data: entriesData, error: entriesError } = await supabase
        .from("budgetEntry")
        .select("*")
        .in(
          "budgetEntryGroupId",
          entryGroupsData?.map((group) => group.id) ?? []
        );
      if (!entriesError) {
        setBudgetEntries(entriesData ?? []);
      }
      setIsLoading(false);
    };

    fetchData();

    const changes = supabase
      .channel("supabase_realtime")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        const { table } = payload;
        if (table === "budgetEntryGroup") {
          handleBudgetEntryGroupChange(payload);
        } else if (table === "budgetEntry") {
          handleBudgetEntryChange(payload);
        }
      })
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [supabase, budgetGroupId]);

  const handleBudgetEntryGroupChange = (payload: any) => {
    const { eventType, new: newEntry, old } = payload;
    switch (eventType) {
      case "INSERT":
        setBudgetEntryGroups((prev) => [...prev, newEntry]);
        break;
      case "UPDATE":
        setBudgetEntryGroups((prev) =>
          prev.map((entry) => (entry.id === newEntry.id ? newEntry : entry))
        );
        break;
      case "DELETE":
        setBudgetEntryGroups((prev) =>
          prev.filter((entry) => entry.id !== old.id)
        );
        break;
      default:
        break;
    }
  };

  const handleBudgetEntryChange = (payload: any) => {
    const { eventType, new: newEntry, old } = payload;
    switch (eventType) {
      case "INSERT":
        setBudgetEntries((prev) => [...prev, newEntry]);
        break;
      case "UPDATE":
        setBudgetEntries((prev) =>
          prev.map((entry) => (entry.id === newEntry.id ? newEntry : entry))
        );
        break;
      case "DELETE":
        setBudgetEntries((prev) => prev.filter((entry) => entry.id !== old.id));
        break;
      default:
        break;
    }
  };

  return (
    <BudgetAutoSaveContext.Provider
      value={{
        budgetEntryGroups,
        budgetEntries,
        budgetGroupId,
        isLoading,
        userIds: partnerId,
      }}
    >
      {children}
    </BudgetAutoSaveContext.Provider>
  );
};
