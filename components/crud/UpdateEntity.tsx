import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  initialValue: string | undefined | null;
  placeHolder: string;
  entityId: string | undefined;
  modifyingProperty: string;
  table: string;
}

const UpdateEntity = ({
  initialValue,
  placeHolder,
  entityId,
  modifyingProperty,
  table,
}: Props) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const updateDb = useCallback(async () => {
    if (initialValue === undefined || initialValue === inputValue) return;
    setIsLoading(true);
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from(table)
      .update({ [modifyingProperty]: inputValue })
      .eq("id", entityId);
    toast.info(`${placeHolder} is now updated.`);
  }, [
    entityId,
    initialValue,
    inputValue,
    modifyingProperty,
    placeHolder,
    table,
  ]);

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
    }
    setIsLoading(false);
  }, [initialValue]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateDb();
    }, 750);
    return () => clearTimeout(timeoutId);
  }, [inputValue, updateDb]);

  return (
    <div className="relative">
      <Label>{placeHolder}</Label>
      <div className="relative">
        {inputValue === undefined ? (
          <Skeleton className="h-[40px]"></Skeleton>
        ) : (
          <>
            <Input
              className="w-full"
              value={inputValue ?? ""}
              onChange={handleInputChange}
              placeholder={placeHolder}
            />
            {isLoading && (
              <Loader2Icon
                size={22}
                className="animate-spin absolute top-0.5 right-0 mr-2 mt-2"
              ></Loader2Icon>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateEntity;
