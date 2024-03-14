import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  type: "Planned" | "Actual" | "Remaining";
  onTypeChange: (type: "Planned" | "Actual" | "Remaining") => void;
}

const TypeSelect = ({ type, onTypeChange }: Props) => {
  const handleChange = () => {
    if (type === "Planned") {
      onTypeChange("Actual");
    } else if (type === "Actual") {
      onTypeChange("Remaining");
    } else {
      onTypeChange("Planned");
    }
  };

  return (
    <Button className="w-[104px]" onClick={handleChange} variant={"outline"}>
      {type}
    </Button>
  );
};

export default TypeSelect;
