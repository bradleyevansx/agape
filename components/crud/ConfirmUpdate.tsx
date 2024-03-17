import { Check, Loader2Icon, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  isLoading: boolean;
  saveData: () => void;
  cancelSave: () => void;
}

const ConfirmUpdate = ({ isLoading, saveData, cancelSave }: Props) => {
  return (
    <span className=" fixed bottom-3 right-3">
      {isLoading ? (
        <Loader2Icon className="animate-spin "></Loader2Icon>
      ) : (
        <span className="flex gap-1">
          <button
            onClick={cancelSave}
            className="bg-primary p-1 rounded-full border"
          >
            <X className="text-primary-foreground"></X>
          </button>
          <button
            onClick={saveData}
            className="p-1 border  bg-green-400 rounded-full"
          >
            <Check className="text-green-200"></Check>
          </button>
        </span>
      )}
    </span>
  );
};

export default ConfirmUpdate;
