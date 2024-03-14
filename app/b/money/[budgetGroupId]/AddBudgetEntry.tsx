"use client";
import { Button } from "@/components/ui/button";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Loader, Loader2Icon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  budgetGroupId: string;
}

const AddBudgetEntry = ({ budgetGroupId }: Props) => {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBudgetEntry = async () => {
    setIsLoading(true);
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase.from("budgetEntry").insert({
      emoji: "😁",
      title: "New Entry",
      budgetEntryGroupId: budgetGroupId,
      userIds: [user.data.user?.id],
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
