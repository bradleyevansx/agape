import { useBudgetAutoSave } from "@/customHooks/useBudget";
import React from "react";
import BudgetEntryGroup from "./budgetEntryGroup/BudgetEntryGroup";
import CreateBudgetEntryGroup from "./budgetEntryGroup/CreateBudgetEntryGroup";
import { Loader2Icon } from "lucide-react";
import Text from "@/components/typography/Text";
import { Card, CardContent } from "@/components/ui/card";
import CopyPlanned from "./CopyPlanned";

interface Props {
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntryGroups = ({ type }: Props) => {
  const { budgetEntryGroups, isLoading } = useBudgetAutoSave();
  return (
    <>
      {!isLoading && (
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
              Create your first set of budget entries or{" "}
              <CopyPlanned></CopyPlanned> all planned entries from last month.
            </Text>
          </CardContent>
        </Card>
      )}
      {!isLoading && <CreateBudgetEntryGroup></CreateBudgetEntryGroup>}
    </>
  );
};

export default BudgetEntryGroups;
