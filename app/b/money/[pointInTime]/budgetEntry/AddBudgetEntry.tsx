"use client";
import { Button } from "@/components/ui/button";
import { useBudgetAutoSave } from "@/customHooks/useBudget";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Loader, Loader2Icon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  budgetEntryGroupId: string;
}

const AddBudgetEntry = ({ budgetEntryGroupId }: Props) => {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const { userIds } = useBudgetAutoSave();

  const handleAddBudgetEntry = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("budgetEntry").insert({
      title: "New Entry",
      budgetEntryGroupId: budgetEntryGroupId,
      userIds: [userIds],
    });
    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleAddBudgetEntry}
      className="w-full"
      variant={"outline"}
    >
      {isLoading ? (
        <Loader2Icon className="animate-spin"></Loader2Icon>
      ) : (
        "Add Entry"
      )}
    </Button>
  );
};

export default AddBudgetEntry;
