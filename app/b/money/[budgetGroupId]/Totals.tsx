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

  const total = useMemo(() => {
    switch (type) {
      case "Planned":
        return totalIncome;
      case "Actual":
        return totalExpenses;
      case "Remaining":
        return totalExpenses;
    }
  }, [budgetEntries, budgetEntryGroups, type]);

  const totalMessage = useMemo(() => {
    let message;
    switch (type) {
      case "Planned":
        message = "Planned Income";
        return message;
      case "Actual":
        message = "Total Spent So Far";
        return message;
      case "Remaining":
        message = "Remaining Left To Be Spent";
        return message;
    }
  }, [type]);

  return (
    <>
      {!isLoading && (
        <Card>
          <CardContent className="pt-6 flex-row flex justify-between">
            <span className="flex flex-col gap-2 items-center">
              <p className="font-bold text-2xl ">{formatMoney(total)}</p>
              <p className=" font-light text-sm bg-neutral-200 text-neutral-500 p-1 rounded">
                {totalMessage}
              </p>
            </span>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Totals;
