"use client";

import MonthSelect from "@/components/monthSelect/monthSelect";
import React, { useEffect, useState } from "react";
import TypeSelect from "./TypeSelect";
import { Tables } from "@/database.types";
import BudgetEntryGroup from "./budgetEntryGroup/BudgetEntryGroup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  BudgetAutoSaveProvider,
  useBudgetAutoSave,
} from "@/customHooks/useBudget";
import BudgetEntryGroups from "./BudgetEntryGroups";
interface Props {
  budgetGroupId: string;
}
const BudgetEntryGroupsDisplay = ({ budgetGroupId }: Props) => {
  const [type, setType] = useState<"Planned" | "Actual" | "Remaining">(
    "Planned"
  );

  return (
    <>
      <section className="h-fit flex gap-2">
        <MonthSelect baseRoute="/b/money"></MonthSelect>
        <div className="border-l"></div>
        <TypeSelect type={type} onTypeChange={setType}></TypeSelect>
      </section>
      <BudgetAutoSaveProvider budgetGroupId={budgetGroupId}>
        <BudgetEntryGroups type={type}></BudgetEntryGroups>
      </BudgetAutoSaveProvider>
    </>
  );
};

export default BudgetEntryGroupsDisplay;
