"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useMemo, useState } from "react";
import { cookies } from "next/headers";
import { Tables } from "@/database.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Text from "@/components/typography/Text";
import BudgetEntry from "../budgetEntry/BudgetEntry";
import AddBudgetEntry from "../budgetEntry/AddBudgetEntry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, ChevronDown, ChevronUp } from "lucide-react";
import UpdateBudgetEntryGroupTitle from "./UpdateBudgetEntryGroupTitle";
import { useBudgetAutoSave } from "@/customHooks/useBudget";
import DeleteBudgetEntryGroup from "./DeleteBudgetEntryGroup";
import { Badge } from "@/components/ui/badge";
import UpdateBudgetEntryGroupType from "./UpdateBudgetEntryGroupType";
interface Props {
  budgetEntryGroup: Tables<"budgetEntryGroup">;
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntryGroup = ({ type, budgetEntryGroup }: Props) => {
  const { budgetEntries } = useBudgetAutoSave();
  const [open, setOpen] = useState(false);
  const availableEntries = useMemo(() => {
    return budgetEntries.filter(
      (entry) => entry.budgetEntryGroupId === budgetEntryGroup.id
    );
  }, [budgetEntries, budgetEntryGroup.id]);
  const styles =
    budgetEntryGroup.type === "debit"
      ? "bg-green-200 text-green-400 h-5 rounded w-5 flex items-center justify-center"
      : "text-red-400 bg-red-100 ";

  const isDebit = budgetEntryGroup.type === "debit" ? "+" : "-";

  return (
    <Card className="w-5/6 max-w-[415px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <UpdateBudgetEntryGroupTitle
            budgetEntryGroup={budgetEntryGroup}
          ></UpdateBudgetEntryGroupTitle>
          <UpdateBudgetEntryGroupType
            budgetEntryGroup={budgetEntryGroup}
            type={type}
          ></UpdateBudgetEntryGroupType>
        </CardTitle>
      </CardHeader>
      {open ? (
        <>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {availableEntries.map((entry: Tables<"budgetEntry">, index) => (
                <React.Fragment key={entry.id}>
                  <BudgetEntry type={type} budgetEntry={entry}></BudgetEntry>
                  {index !== availableEntries.length - 1 && (
                    <div className="border-b border-neutral-100"></div>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="gap-2">
            <DeleteBudgetEntryGroup
              budgetGroupId={budgetEntryGroup.id}
            ></DeleteBudgetEntryGroup>
            <AddBudgetEntry
              budgetEntryGroupId={budgetEntryGroup.id}
            ></AddBudgetEntry>
            <Button onClick={() => setOpen(false)} variant={"secondary"}>
              <ChevronUp></ChevronUp>
            </Button>
          </CardFooter>
        </>
      ) : (
        <CardFooter>
          <Button
            onClick={() => setOpen(true)}
            variant={"secondary"}
            className="w-full"
          >
            <ChevronDown></ChevronDown>
            {budgetEntryGroup.type === "debit" ? "Debits" : "Credits"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BudgetEntryGroup;
