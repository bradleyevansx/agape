import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

interface Props {
  selectedCategoryId: string;
  onChange: (val: string) => void;
  type: "debit" | "credit" | undefined;
}

const SelectCategory = ({ selectedCategoryId, onChange, type }: Props) => {
  const [categories, setCategories] = useState<Tables<"budgetEntryCategory">[]>(
    []
  );

  useEffect(() => {
    const fetchAsync = async () => {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from("budgetEntryCategory")
        .select("*");
      setCategories(data as Tables<"budgetEntryCategory">[]);
    };
    fetchAsync();
  }, []);

  return (
    <span>
      <Label>Category</Label>
      <Select
        disabled={type === "credit" || categories.length === 0}
        value={selectedCategoryId}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Expense Category</SelectLabel>
            {categories.map((x) => (
              <SelectItem value={x.id} key={x.id}>
                {x.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </span>
  );
};

export default SelectCategory;
