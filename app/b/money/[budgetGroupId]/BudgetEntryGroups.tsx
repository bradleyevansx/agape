import { useBudgetAutoSave } from "@/customHooks/useBudget";
import React from "react";
import BudgetEntryGroup from "./budgetEntryGroup/BudgetEntryGroup";
import AddBudgetEntryGroup from "./budgetEntryGroup/AddBudgetEntryGroup";
import { Loader2Icon } from "lucide-react";
import Text from "@/components/typography/Text";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntryGroups = ({ type }: Props) => {
  const { budgetEntryGroups, isLoading } = useBudgetAutoSave();
  return (
    <>
      {isLoading ? (
        <Loader2Icon className="animate-spin"></Loader2Icon>
      ) : (
        <>
          {budgetEntryGroups?.map((entryGroup) => (
            <BudgetEntryGroup
              type={type}
              key={entryGroup.id}
              budgetEntryGroup={entryGroup}
            ></BudgetEntryGroup>
          ))}
        </>
      )}
      {!isLoading && budgetEntryGroups.length === 0 && (
        <Card className="flex flex-col gap-2">
          <CardContent className="mt-4">
            <Text variant="large">No Groups</Text>
            <Text variant="small">
              Create your first set of budget entries.
            </Text>
          </CardContent>
        </Card>
      )}
      {!isLoading && <AddBudgetEntryGroup></AddBudgetEntryGroup>}
    </>
  );
};

export default BudgetEntryGroups;
