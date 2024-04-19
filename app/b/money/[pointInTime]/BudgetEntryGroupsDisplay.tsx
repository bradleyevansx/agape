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
import Totals from "./Totals";
import Loading from "./Loading";
import NeedsBudgeting from "./NeedsBudgeting";
interface Props {
  pointInTime: string;
}
const BudgetEntryGroupsDisplay = ({ pointInTime }: Props) => {
  const [type, setType] = useState<"Planned" | "Actual" | "Remaining">(
    "Planned"
  );

  const [id, setId] = useState(pointInTime);

  return (
    <>
      <section className="h-fit flex gap-2">
        <MonthSelect onIdChange={setId} baseRoute="/b/money"></MonthSelect>
        <div className="border-l"></div>
        <TypeSelect type={type} onTypeChange={setType}></TypeSelect>
      </section>
      <BudgetAutoSaveProvider pointInTime={id}>
        <Loading></Loading>
        <Totals type={type}></Totals>
        <NeedsBudgeting></NeedsBudgeting>
        <BudgetEntryGroups type={type}></BudgetEntryGroups>
      </BudgetAutoSaveProvider>
    </>
  );
};

export default BudgetEntryGroupsDisplay;
