import Heading from "@/components/typography/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudgetAutoSave } from "@/customHooks/useBudget";
import { Tables } from "@/database.types";
import { formatMoney } from "@/lib/money";
import React, { useCallback, useMemo } from "react";

interface Props {
  type: "Planned" | "Actual" | "Remaining";
}

const Totals = ({ type }: Props) => {
  const { budgetEntries, budgetEntryGroups, isLoading } = useBudgetAutoSave();

  const getEntryValue = (
    budgetEntry: Tables<"budgetEntry">,
    desiredBudgetEntryType: "debit" | "credit"
  ) => {
    const budgetEntryType = budgetEntryGroups.find(
      (x) => x.id === budgetEntry.budgetEntryGroupId
    )?.type;

    if (budgetEntryType === desiredBudgetEntryType) {
      return getValue(budgetEntry);
    }
    return 0;
  };

  const getValue = (budgetEntry: Tables<"budgetEntry">) => {
    switch (type) {
      case "Planned":
        return budgetEntry.planned;
      case "Actual":
        return budgetEntry.actual;
      case "Remaining":
        return budgetEntry.planned - budgetEntry.actual;
      default:
        return 0;
    }
  };

  const totalIncome = useMemo(() => {
    return budgetEntries.reduce((total, entry) => {
      if (getEntryValue(entry, "credit")) {
        return total + getEntryValue(entry, "credit");
      } else {
        return total;
      }
    }, 0);
  }, [budgetEntries, budgetEntryGroups, type, getEntryValue]);

  const totalExpenses = useMemo(() => {
    return budgetEntries.reduce((total, entry) => {
      if (getEntryValue(entry, "debit")) {
        return total + getEntryValue(entry, "debit");
      } else {
        return total;
      }
    }, 0);
  }, [budgetEntries, budgetEntryGroups, type, getEntryValue]);

  return (
    <>
      {!isLoading && (
        <Card className="w-full">
          <CardContent className="pt-6 flex-row flex justify-between">
            <span className="flex flex-col gap-2 items-center">
              <p className="font-bold text-2xl ">{formatMoney(totalIncome)}</p>
              <p className=" font-light text-sm bg-green-200 text-green-500 p-1 rounded">
                Monthly Income
              </p>
            </span>
            <span className="flex flex-col gap-2 items-center">
              <p className="font-bold text-2xl ">
                {formatMoney(totalExpenses)}
              </p>
              <p className="bg-red-200 text-red-500 p-1 rounded font-light text-sm">
                Monthly Expenses
              </p>
            </span>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Totals;
