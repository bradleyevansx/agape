import Text from "@/components/typography/Text";
import { Input } from "@/components/ui/input";
import { Tables } from "@/database.types";
import React from "react";
import UpdateBudgetEntryTitle from "./UpdateBudgetEntryTitle";
import UpdateBudgetEntryAmount from "./UpdateBudgetEntryAmount";

interface Props {
  budgetEntry: Tables<"budgetEntry">;
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntry = ({ budgetEntry, type }: Props) => {
  return (
    <li className="flex items-center">
      <p className="mr-1">{budgetEntry.emoji}</p>
      <UpdateBudgetEntryTitle
        budgetEntry={budgetEntry}
      ></UpdateBudgetEntryTitle>
      <UpdateBudgetEntryAmount
        budgetEntry={budgetEntry}
        type={type}
      ></UpdateBudgetEntryAmount>
    </li>
  );
};

export default BudgetEntry;
