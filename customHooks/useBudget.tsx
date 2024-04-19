import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/database.types";

interface BudgetAutoSaveProps {
  budgetEntryGroups: Tables<"budgetEntryGroup">[];
  budgetEntries: Tables<"budgetEntry">[];
  pointInTime: string;
  isLoading: boolean;
  userIds: string[];
  budgetEntryCategories: Tables<"budgetEntryCategory">[];
}

const BudgetAutoSaveContext = createContext<BudgetAutoSaveProps>({
  budgetEntryGroups: [],
  budgetEntries: [],
  pointInTime: "",
  isLoading: false,
  userIds: [],
  budgetEntryCategories: [],
});

export const useBudgetAutoSave = () => useContext(BudgetAutoSaveContext);

interface BudgetAutoSaveProviderProps {
  children: React.ReactNode;
  pointInTime: string;
}

export const BudgetAutoSaveProvider: React.FC<BudgetAutoSaveProviderProps> = ({
  children,
  pointInTime,
}) => {
  const [partnerId, setPartnerId] = useState<string[]>([]);
  const supabase = createClientComponentClient();
  const [budgetEntryGroups, setBudgetEntryGroups] = useState<
    Tables<"budgetEntryGroup">[]
  >([]);
  const [budgetEntries, setBudgetEntries] = useState<Tables<"budgetEntry">[]>(
    []
  );
  const [budgetEntryCategories, setBudgetEntryCategories] = useState<
    Tables<"budgetEntryCategory">[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: entryGroupsData, error: entryGroupsError } = await supabase
        .from("budgetEntryGroup")
        .select("*")
        .eq("pointInTime", pointInTime);
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

      const { data: categoriesData, error: categoriesError } = await supabase
        .from("budgetEntryCategory")
        .select("*");

      if (!categoriesError) {
        setBudgetEntryCategories(
          categoriesData as Tables<"budgetEntryCategory">[]
        );
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
  }, [supabase, pointInTime]);

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
        budgetEntryCategories,
        budgetEntryGroups,
        budgetEntries,
        pointInTime,
        isLoading,
        userIds: partnerId,
      }}
    >
      {children}
    </BudgetAutoSaveContext.Provider>
  );
};
