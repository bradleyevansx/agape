"use client";

import { Tables } from "@/database.types";
import { months } from "@/types/months";
import { Loader2Icon, ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  onChange: (val: string) => void;
}

const ValueSetter = ({ onChange }: Props) => {
  const [monthYear, setMonthYear] = useState<{
    month: string;
    year: string;
  } | null>(null);

  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchNewData = async () => {
      if (monthYear) {
        const { data, error } = await supabase
          .from("budgetGroup")
          .select()
          .eq("month", monthYear?.month)
          .eq("year", monthYear?.year)
          .single<Tables<"budgetGroup">>();

        if (!data) return;
        setMonthYear({
          month: data.month,
          year: data.year,
        });
        onChange(data.id);
      }
    };
    fetchNewData();
  }, [monthYear, monthYear?.month, monthYear?.year, onChange, supabase]);

  const handleMonthChange = (newMonthYear: string) => {
    const [newMonth, newYear] = newMonthYear.split(" ");
    setMonthYear({ month: newMonth, year: newYear });
  };

  if (monthYear === null) {
    return <Loader2Icon className=" animate-spin"></Loader2Icon>;
  }

  return (
    <span className="flex gap-1">
      <button className="p-1 px-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        <ArrowLeft strokeWidth={"1px"}></ArrowLeft>
      </button>
      <Select
        value={`${monthYear?.month} ${monthYear?.year}`}
        onValueChange={handleMonthChange}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Months</SelectLabel>
            {months.map((x, index) => (
              <SelectItem value={`${x} ${monthYear?.year}`} key={index}>
                {`${x} ${monthYear?.year}`}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <button className="p-1 px-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        <ArrowRight strokeWidth={"1px"}></ArrowRight>
      </button>
    </span>
  );
};

export default ValueSetter;
