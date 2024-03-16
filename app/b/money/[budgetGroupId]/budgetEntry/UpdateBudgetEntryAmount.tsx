import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { Check, Loader2Icon } from "lucide-react";

interface Props {
  budgetEntry: Tables<"budgetEntry">;
  type: "Planned" | "Actual" | "Remaining";
}

const UpdateBudgetEntryAmount = ({ budgetEntry, type }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const remaining = useMemo(() => {
    return budgetEntry.planned - budgetEntry.actual;
  }, [budgetEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  const saveData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const supabase = createClientComponentClient();
    let updateData: { [key: string]: any } = {};
    if (type === "Planned") {
      updateData.planned = value;
    } else if (type === "Actual") {
      updateData.actual = value;
    }

    const { data, error } = await supabase
      .from("budgetEntry")
      .update(updateData)
      .eq("id", budgetEntry.id);
    setIsEditing(false);
    setIsLoading(false);
  };
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await saveData();

      e.preventDefault();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  const saveButton = useMemo(() => {
    return (
      <>
        {isLoading ? (
          <Loader2Icon
            className="animate-spin text-green-400"
            size={15}
          ></Loader2Icon>
        ) : (
          <Check size={15} className="text-green-400"></Check>
        )}
      </>
    );
  }, [isLoading]);

  useEffect(() => {
    if (isEditing) {
      document.getElementById("inputField")?.focus();
    }
  }, [isEditing]);

  const inputClassName =
    "border-t-0 ml-auto w-[82px] text-center border-x-0 rounded-none active:outline-none h-[24px]";

  const pClassName =
    "text-sm font-semibold hover:cursor-pointer w-[82px] text-center";

  switch (type) {
    case "Planned":
      return isEditing ? (
        <span className="relative">
          <Input
            id="inputField"
            className={inputClassName}
            type="number"
            value={value !== undefined ? value.toString() : ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <span
            onClick={saveData}
            className="bg-green-100 hover:cursor-pointer text-green absolute top-0.5 p-0.5 rounded-xl right-0"
          >
            {saveButton}
          </span>
        </span>
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
            setValue(budgetEntry.planned);
          }}
          className={pClassName}
        >
          {"$" + budgetEntry.planned.toFixed(2)}
        </p>
      );
    case "Actual":
      return isEditing ? (
        <span className="relative">
          <Input
            id="inputField"
            className={inputClassName}
            type="number"
            value={value !== undefined ? value.toString() : ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <span
            onClick={saveData}
            className="bg-green-100 hover:cursor-pointer text-green absolute top-0.5 p-0.5 rounded-xl right-0"
          >
            {saveButton}
          </span>
        </span>
      ) : (
        <p
          onClick={() => {
            setIsEditing(true);
            setValue(budgetEntry.actual);
          }}
          className={pClassName}
        >
          {"$" + budgetEntry.actual.toFixed(2)}
        </p>
      );
    case "Remaining":
      return <p className={pClassName}>{remaining}</p>;
    default:
      return null;
  }
};

export default UpdateBudgetEntryAmount;
