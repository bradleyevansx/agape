"use client";

import { Input } from "@/components/ui/input";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  budgetEntry: Tables<"budgetEntry">;
}

const className =
  "border-t-0 pl-0 w-[150px] mr-auto border-x-0 rounded-none active:outline-none h-[24px]";

const UpdateBudgetEntryTitle = ({ budgetEntry }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const supabase = createClientComponentClient();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.length === 0) {
        toast.warning("Title cannot be empty");
        return;
      }
      const { data, error } = await supabase
        .from("budgetEntry")
        .update({ title: value })
        .eq("id", budgetEntry.id)
        .select()
        .single();
      setIsEditing(false);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setValue(budgetEntry.title!);
      setIsEditing(false);
      e.preventDefault();
    }
  };
  const [value, setValue] = useState<string>(budgetEntry.title!);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 15) {
      toast.warning("Title cannot be longer than 15 characters");
      return;
    }
    setValue(e.target.value);
  };

  useEffect(() => {
    if (isEditing) {
      document.getElementById("title")?.focus();
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <Input
          id="title"
          onChange={handleOnChange}
          value={value}
          onKeyDown={handleKeyDown}
          className={className}
        ></Input>
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
          }}
          className="text-sm font-semibold mr-auto hover:cursor-pointer"
        >
          {budgetEntry.title}
          {!budgetEntry.title && "New Entry"}
        </p>
      )}
    </>
  );
};

export default UpdateBudgetEntryTitle;
