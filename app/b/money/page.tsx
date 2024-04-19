import React from "react";

import { redirect } from "next/navigation";
import { getMonthString } from "@/lib/month";

const Dashboard = async () => {
  const currentDate = new Date();
  const currentMonth = getMonthString(currentDate.getMonth() + 1);
  const currentYear = currentDate.getFullYear().toString();

  redirect(`/b/money/${currentMonth}-${currentYear}`);

  return (
    <>
      <p>{currentMonth}</p>
      <p>{currentYear}</p>
    </>
  );
};

export default Dashboard;
