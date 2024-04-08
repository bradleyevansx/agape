import React from "react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/database.types";
import { redirect } from "next/navigation";
import { months } from "@/types/months";
import { getMonthString } from "@/lib/month";

const Dashboard = async () => {
  const supabase = createServerComponentClient({ cookies });
  const currentDate = new Date();
  const currentMonth = getMonthString(currentDate.getMonth() + 1);
  const currentYear = currentDate.getFullYear().toString();

  const { data, error } = await supabase
    .from("budgetGroup")
    .select()
    .eq("month", currentMonth)
    .eq("year", currentYear);

  if (data && data?.length === 1) {
    redirect(`/b/money/${data[0]?.id}`);
  }

  return (
    <>
      <p>{currentMonth}</p>
      <p>{currentYear}</p>
    </>
  );
};

export default Dashboard;
