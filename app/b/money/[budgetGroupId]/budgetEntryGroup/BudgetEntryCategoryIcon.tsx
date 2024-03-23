import { useBudgetAutoSave } from "@/customHooks/useBudget";
import { Tables } from "@/database.types";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  budgetEntryGroup: Tables<"budgetEntryGroup">;
}

const BudgetEntryCategoryIcon = ({ budgetEntryGroup }: Props) => {
  const { budgetEntryCategories } = useBudgetAutoSave();

  const icon = useMemo(() => {
    if (budgetEntryGroup.type === "credit") {
      return "💸";
    }
    return (
      budgetEntryCategories.find(
        (x) => x.id === budgetEntryGroup.budgetEntryCategoryId
      )?.emoji ?? ""
    );
  }, [budgetEntryGroup, budgetEntryCategories]);

  return <p>{icon}</p>;
};

export default BudgetEntryCategoryIcon;
