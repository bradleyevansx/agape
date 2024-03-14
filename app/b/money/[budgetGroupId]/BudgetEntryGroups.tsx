import { useBudgetAutoSave } from "@/customHooks/useBudget";
import React from "react";
import BudgetEntryGroup from "./budgetEntryGroup/BudgetEntryGroup";
import AddBudgetEntryGroup from "./AddBudgetEntryGroup";

interface Props {
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntryGroups = ({ type }: Props) => {
  const { budgetEntryGroups } = useBudgetAutoSave();
  return (
    <>
      {budgetEntryGroups?.map((entryGroup) => (
        <BudgetEntryGroup
          type={type}
          key={entryGroup.id}
          budgetGroup={entryGroup}
        ></BudgetEntryGroup>
      ))}
      <AddBudgetEntryGroup></AddBudgetEntryGroup>
    </>
  );
};

export default BudgetEntryGroups;
