"use client";
import { getMonthString } from "@/lib/month";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Loader2Icon } from "lucide-react";
import { title } from "process";
import React, { useState } from "react";

const CopyPlanned = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleCopy = async () => {
    setIsLoading(true);
    const supabase = createClientComponentClient();
    const currentDate = new Date();
    const lastMonth = getMonthString(currentDate.getMonth());
    const currentMonth = getMonthString(currentDate.getMonth() + 1);

    const currentYear = currentDate.getFullYear().toString();

    const { data: lastMonthGroups, error: plannedEntriesError } = await supabase
      .from("budgetEntryGroup")
      .select()
      .eq("pointInTime", `${lastMonth}-${currentYear}`);

    if (!lastMonthGroups) return;

    for (const entryGroup of lastMonthGroups) {
      const { data: newGroup } = await supabase
        .from("budgetEntryGroup")
        .insert([
          {
            pointInTime: `${currentMonth}-${currentYear}`,
            title: entryGroup.title,
            userIds: entryGroup.userIds,
            type: entryGroup.type,
            budgetEntryCategoryId: entryGroup.budgetEntryCategoryId,
            userId: entryGroup.userId,
          },
        ])
        .select()
        .single();

      if (!newGroup) continue;

      const { data: lastMonthEntries, error: lastMonthEntriesError } =
        await supabase
          .from("budgetEntry")
          .select()
          .eq("budgetEntryGroupId", entryGroup.id)
          .select();

      if (!lastMonthEntries) continue;

      for (const entry of lastMonthEntries) {
        await supabase.from("budgetEntry").insert([
          {
            budgetEntryGroupId: newGroup.id,
            title: entry.title,
            userIds: entry.userIds,
            planned: entry.planned,
            actual: 0,
          },
        ]);
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <b
        onClick={handleCopy}
        className="hover:cursor-pointer text-blue-500 bg-blue-100 p-0.5 rounded"
      >
        {isLoading ? "Copying..." : "Copy"}
      </b>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loader2Icon
            size={20}
            className="animate-spin opacity-100"
          ></Loader2Icon>
        </div>
      )}
    </>
  );
};

export default CopyPlanned;
