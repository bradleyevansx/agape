import { useBudgetAutoSave } from "@/customHooks/useBudget";
import { Loader2Icon } from "lucide-react";
import React from "react";

const Loading = () => {
  const { isLoading } = useBudgetAutoSave();
  return (
    <>
      {isLoading && (
        <Loader2Icon className="animate-spin fixed top-1/2 left-1/2"></Loader2Icon>
      )}
    </>
  );
};

export default Loading;
