"use client";

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
import { months } from "@/types/months";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/database.types";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";

interface Props {
  baseRoute: string;
}

const MonthSelect = ({ baseRoute }: Props) => {
  const router = useRouter();
  const { budgetGroupId } = useParams();
  const supabase = createClientComponentClient();
  const [monthYear, setMonthYear] = useState<{
    month: string;
    year: string;
  } | null>(null);

  useEffect(() => {
    console.log("TOP");
    const fetchGroup = async () => {
      const { data, error } = await supabase
        .from("budgetGroup")
        .select()
        .eq("id", budgetGroupId)
        .single<Tables<"budgetGroup">>();
      if (!data) return;
      setMonthYear({ month: data.month, year: data.year });
    };
    fetchGroup();
  }, []);

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
        console.log(data);
        setMonthYear({
          month: data.month,
          year: data.year,
        });
        window.history.pushState(null, "", `${baseRoute}/${data.id}`);
      }
    };
    fetchNewData();
  }, [monthYear?.month, monthYear?.year]);

  const handleMonthChange = (newMonthYear: string) => {
    const [newMonth, newYear] = newMonthYear.split(" ");
    setMonthYear({ month: newMonth, year: newYear });
  };

  const handleIncreaseMonth = () => {
    let index = months.indexOf(monthYear?.month!);
    if (index < 11) {
      setMonthYear((prev) => {
        return { ...prev!, month: months[index + 1] };
      });
    }
  };
  const handleDecreaseMonth = () => {
    let index = months.indexOf(monthYear?.month!);
    if (index > 0) {
      setMonthYear((prev) => {
        return { ...prev!, month: months[index - 1] };
      });
    }
  };

  return (
    <span className="flex gap-1">
      <button
        onClick={handleDecreaseMonth}
        className="p-1 px-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
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
      <button
        onClick={handleIncreaseMonth}
        className="p-1 px-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowRight strokeWidth={"1px"}></ArrowRight>
      </button>
    </span>
  );
};

export default MonthSelect;
