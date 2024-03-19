import Text from "@/components/typography/Text";
import { Card, CardContent } from "@/components/ui/card";
import { useBudgetAutoSave } from "@/customHooks/useBudget";
import { formatMoney } from "@/lib/money";
import React, { useMemo } from "react";

const NeedsBudgeting = () => {
  const { budgetEntries, budgetEntryGroups } = useBudgetAutoSave();

  const getTotal = (desiredEntryType: "debit" | "credit") => {
    return budgetEntries.reduce((total, a) => {
      const entryType = budgetEntryGroups.find(
        (x) => x.id === a.budgetEntryGroupId
      )?.type;
      if (entryType === desiredEntryType) {
        return total + a.planned;
      }
      return total;
    }, 0);
  };

  const totalPlannedIncome = useMemo(() => {
    console.log(getTotal("credit"));
    return getTotal("credit");
  }, [budgetEntries, budgetEntryGroups]);
  const totalPlannedExpenses = useMemo(() => {
    console.log(getTotal("debit"));
    return getTotal("debit");
  }, [budgetEntries, budgetEntryGroups]);

  return (
    <Card className="sticky top-[65px]">
      <CardContent className="p-2">
        <Text variant="muted">
          Remaining left to budget:{" "}
          <b>{formatMoney(totalPlannedIncome - totalPlannedExpenses)}</b>
        </Text>
      </CardContent>
    </Card>
  );
};

export default NeedsBudgeting;
