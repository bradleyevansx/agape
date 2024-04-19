"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/database.types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  baseRoute: string;
  onIdChange: (val: string) => void;
}

const MonthSelect = ({ baseRoute, onIdChange }: Props) => {
  const { pointInTime } = useParams();

  const initialPIT = useMemo(() => {
    const PIT = pointInTime as string;
    const split = PIT.split("-");
    return { month: split[0], year: split[1] };
  }, []);

  const [monthYear, setMonthYear] = useState<{
    month: string;
    year: string;
  } | null>(initialPIT);

  const handleMonthChange = (newMonthYear: string) => {
    const [newMonth, newYear] = newMonthYear.split("-");
    window.history.pushState(null, "", `${baseRoute}/${newMonth}-${newYear}`);
    setMonthYear({ month: newMonth, year: newYear });
  };

  const handleIncreaseMonth = () => {
    let index = months.indexOf(monthYear?.month!);
    if (index < 11) {
      console.log(`${months[index + 1]}-${monthYear?.year}`);
      handleMonthChange(`${months[index + 1]}-${monthYear?.year}`);
    }
  };
  const handleDecreaseMonth = () => {
    let index = months.indexOf(monthYear?.month!);
    if (index > 0) {
      handleMonthChange(`${months[index - 1]}-${monthYear?.year}`);
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
