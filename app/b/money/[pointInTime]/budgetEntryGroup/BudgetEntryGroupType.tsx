import { Badge } from "@/components/ui/badge";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  budgetEntryGroup: Tables<"budgetEntryGroup">;
  type: "Planned" | "Actual" | "Remaining";
}

const BudgetEntryGroupType = ({ budgetEntryGroup, type }: Props) => {
  return (
    <Badge
      className="w-3 h-3 p-0 absolute top-1 right-1"
      variant={budgetEntryGroup.type}
    ></Badge>
  );
};

export default BudgetEntryGroupType;
