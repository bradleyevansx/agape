import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/types/months";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBudgetAutoSave } from "@/customHooks/useBudget";

const AddBudgetEntryGroup = () => {
  const [open, setOpen] = useState(false);
  const supabase = createClientComponentClient();
  const { budgetGroupId } = useBudgetAutoSave();
  const [type, setType] = useState<"debit" | "credit" | undefined>();
  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const handleAddBudgetEntryGroup = async () => {
    if (title.length === 0) {
      toast.error("Please enter a title");
      return;
    }
    if (type === undefined) {
      toast.error("Please select a type");
      return;
    }
    setIsLoading(true);
    const user = await supabase.auth.getUser();

    const { data, error } = await supabase.from("budgetEntryGroup").insert({
      title: title,
      type: type,
      budgetGroupId: budgetGroupId,
      userIds: [user.data.user?.id],
    });
    setOpen(false);
    setIsLoading(false);
  };
  const initValues = () => {
    setType(undefined);
    setTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddBudgetEntryGroup();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      toast.error("Title must be less than 20 characters");
      return;
    }
    setTitle(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(x) => {
        setOpen(x);
        if (!x) initValues();
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"secondary"}
          className="w-5/6"
        >
          Add Group
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-60 rounded-lg">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Create a new budget group</DialogDescription>
        </DialogHeader>
        <span>
          <Label>Name</Label>
          <Input
            onKeyDown={handleKeyDown}
            value={title}
            onChange={handleTitleChange}
            placeholder="Fun Money 💰"
          ></Input>
        </span>
        <span>
          <Label>Type</Label>
          <Select
            value={type}
            onValueChange={(value) => {
              setType(value as "debit" | "credit" | undefined);
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Debit or Credit</SelectLabel>
                <SelectItem value={`debit`} key={1}>
                  {`Debit`}
                </SelectItem>
                <SelectItem value={`credit`} key={2}>
                  {`Credit`}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <Button variant={"secondary"} onClick={handleAddBudgetEntryGroup}>
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetEntryGroup;
