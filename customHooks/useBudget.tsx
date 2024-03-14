import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/database.types";

interface BudgetAutoSaveProps {
  budgetEntryGroups: Tables<"budgetEntryGroup">[];
  budgetEntries: Tables<"budgetEntry">[];
  budgetGroupId: string;
}

const BudgetAutoSaveContext = createContext<BudgetAutoSaveProps>({
  budgetEntryGroups: [],
  budgetEntries: [],
  budgetGroupId: "",
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
  const supabase = createClientComponentClient();
  const [budgetEntryGroups, setBudgetEntryGroups] = useState<
    Tables<"budgetEntryGroup">[]
  >([]);
  const [budgetEntries, setBudgetEntries] = useState<Tables<"budgetEntry">[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: entryGroupsData, error: entryGroupsError } = await supabase
        .from("budgetEntryGroup")
        .select("*")
        .eq("budgetGroupId", budgetGroupId);
      if (!entryGroupsError) {
        setBudgetEntryGroups(entryGroupsData ?? []);
      }

      const { data: entriesData, error: entriesError } = await supabase
        .from("budgetEntry")
        .select("*")
        .eq(
          "budgetEntryGroupId",
          entryGroupsData?.map((group) => group.id) ?? []
        );
      if (!entriesError) {
        setBudgetEntries(entriesData ?? []);
      }
    };

    fetchData();

    const changes = supabase
      .channel("supabase_realtime")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        console.log(payload);
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
      value={{ budgetEntryGroups, budgetEntries, budgetGroupId }}
    >
      {children}
    </BudgetAutoSaveContext.Provider>
  );
};
