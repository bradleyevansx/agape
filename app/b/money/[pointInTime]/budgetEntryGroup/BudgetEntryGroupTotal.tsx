import { Tables } from "@/database.types";
import { formatMoney } from "@/lib/money";
import React, { useMemo } from "react";

interface Props {
  entries: Tables<"budgetEntry">[];
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntryGroupTotal = ({ entries, type }: Props) => {
  const total = useMemo(() => {
    switch (type) {
      case "Actual":
        return entries.reduce((a, curr, total) => {
          return (total += curr.actual);
        }, 0);
      case "Planned":
        return entries.reduce((a, curr, total) => {
          return (total += curr.planned);
        }, 0);
      case "Remaining":
        return entries.reduce((a, curr, total) => {
          return (total += curr.planned - curr.actual);
        }, 0);
    }
  }, [entries, type]);

  return <p className="ml-auto text-sm font-normal">{formatMoney(total)}</p>;
};

export default BudgetEntryGroupTotal;
