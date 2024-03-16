"use client";

import { Input } from "@/components/ui/input";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Check, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface Props {
  budgetEntryGroup: Tables<"budgetEntryGroup">;
}

const className =
  "border-t-0 pl-0 w-[150px] mr-auto border-x-0 rounded-none active:outline-none h-[24px]";

const UpdateBudgetEntryGroupTitle = ({ budgetEntryGroup }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveData = async () => {
    setIsLoading(true);
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from("budgetEntryGroup")
      .update({ title: value })
      .eq("id", budgetEntryGroup.id)
      .select()
      .single();
    setIsEditing(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.length === 0) {
        toast.warning("Title cannot be empty");
        return;
      }
      saveData();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setValue(budgetEntryGroup.title!);
      setIsEditing(false);
      e.preventDefault();
    }
  };
  const [value, setValue] = useState<string>(budgetEntryGroup.title!);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      toast.warning("Title cannot be longer than 20 characters");
      return;
    }
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isEditing) {
      document.getElementById("title")?.focus();
    } else {
      setIsLoading(false);
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <span className="relative">
          <Input
            id="title"
            onChange={handleOnChange}
            value={value}
            onKeyDown={handleKeyDown}
            className={className}
          ></Input>

          <span
            onClick={saveData}
            className="bg-green-100 hover:cursor-pointer text-green absolute top-0.5 p-0.5 rounded-xl right-0"
          >
            {isLoading ? (
              <Loader2Icon
                className="animate-spin text-green-400"
                size={15}
              ></Loader2Icon>
            ) : (
              <Check size={15} className="text-green-400"></Check>
            )}
          </span>
        </span>
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
          }}
          className="text-lg flex gap-2 items-center hover:cursor-pointer"
        >
          {budgetEntryGroup.title}
        </p>
      )}
    </>
  );
};

export default UpdateBudgetEntryGroupTitle;
