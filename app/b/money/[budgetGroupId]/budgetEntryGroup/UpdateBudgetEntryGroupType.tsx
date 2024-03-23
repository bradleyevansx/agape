import { Badge } from "@/components/ui/badge";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  budgetEntryGroup: Tables<"budgetEntryGroup">;
  type: "Planned" | "Actual" | "Remaining";
}

const UpdateBudgetEntryGroupType = ({ budgetEntryGroup, type }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    setIsLoading(true);
    const supabase = createClientComponentClient();

    const newValue = budgetEntryGroup.type === "debit" ? "credit" : "debit";

    await supabase
      .from("budgetEntryGroup")
      .update({ type: newValue })
      .eq("id", budgetEntryGroup.id);
    setIsLoading(false);
  };

  return (
    <Badge
      // onClick={handleUpdate}
      className="min-w-[58px] min-h-[22px]"
      variant={budgetEntryGroup.type}
    >
      {type}
    </Badge>
  );
};

export default UpdateBudgetEntryGroupType;
