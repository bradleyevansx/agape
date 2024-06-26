import MonthSelect from "@/components/monthSelect/monthSelect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@/database.types";
import BudgetEntryGroup from "./budgetEntryGroup/BudgetEntryGroup";
import TypeSelect from "./TypeSelect";
import BudgetEntryGroupsDisplay from "./BudgetEntryGroupsDisplay";
const BudgetEntryGroupEditor = async ({ params }: { params: Params }) => {
  const { pointInTime } = params;
  return (
    <div className="flex flex-col gap-4 p-4 justify-start items-center ">
      <BudgetEntryGroupsDisplay
        pointInTime={pointInTime}
      ></BudgetEntryGroupsDisplay>
    </div>
  );
};

export default BudgetEntryGroupEditor;
