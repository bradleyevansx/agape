import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBudgetAutoSave } from "@/customHooks/useBudget";
import SelectCategory from "./SelectCategory";
import { Tables } from "@/database.types";

const CreateBudgetEntryGroup = () => {
  const [open, setOpen] = useState(false);
  const supabase = createClientComponentClient();
  const { budgetGroupId, userIds } = useBudgetAutoSave();
  const [type, setType] = useState<"debit" | "credit" | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userId, setUserId] = useState("");

  const [users, setUsers] = useState<Tables<"profile">[]>([]);

  useEffect(() => {
    if (!userIds) return;
    const fetchAsync = async () => {
      const user = await supabase.auth.getUser();
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.data.user?.id)
        .single<Tables<"profile">>();

      const { data: partnerData } = await supabase
        .from("profile")
        .select("*")
        .eq(
          "id",
          userIds.find((x) => x !== user.data.user?.id)
        )
        .single<Tables<"profile">>();

      if (partnerData && data) {
        setUsers(() => [data, partnerData]);
      }
    };

    fetchAsync();
  }, [userIds]);

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
    if (userId === "") {
      toast.error("Please assign this group to a person");
    }
    setIsLoading(true);

    const { data, error } = await supabase.from("budgetEntryGroup").insert({
      title: title,
      type: type,
      budgetGroupId: budgetGroupId,
      userIds: [userIds],
      budgetEntryCategoryId: categoryId.length > 0 ? categoryId : null,
      userId: userId,
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
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Income or Expense</SelectLabel>
                <SelectItem value={`credit`} key={2}>
                  {`Income`}
                </SelectItem>
                <SelectItem value={`debit`} key={1}>
                  {`Expense`}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <SelectCategory
          type={type}
          selectedCategoryId={categoryId}
          onChange={setCategoryId}
        ></SelectCategory>
        <span>
          <Label>Person</Label>
          <Select
            value={userId}
            onValueChange={(value) => {
              setUserId(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select person" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                {users.map((x) => (
                  <SelectItem key={x.id} value={x.id}>
                    {x.firstName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <Button
          variant={"secondary"}
          disabled={isLoading}
          onClick={handleAddBudgetEntryGroup}
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudgetEntryGroup;
