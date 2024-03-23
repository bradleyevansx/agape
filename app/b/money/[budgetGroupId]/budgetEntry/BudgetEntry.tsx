import Text from "@/components/typography/Text";
import { Input } from "@/components/ui/input";
import { Tables } from "@/database.types";
import React from "react";
import UpdateBudgetEntryTitle from "./UpdateBudgetEntryTitle";
import UpdateBudgetEntryAmount from "./UpdateBudgetEntryAmount";
import DeleteBudgetEntry from "./DeleteBudgetEntry";

interface Props {
  budgetEntry: Tables<"budgetEntry">;
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntry = ({ budgetEntry, type }: Props) => {
  return (
    <li className="flex items-center">
      <DeleteBudgetEntry budgetEntryId={budgetEntry.id}></DeleteBudgetEntry>
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
