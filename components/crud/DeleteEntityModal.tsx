import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Trash2, AlertOctagon } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  trigger: ReactNode;
  tableName: string;
  entityId: string;
}

const DeleteEntityModal = ({ trigger, tableName, entityId }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const supabase = createClientComponentClient();
    setIsLoading(true);
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", entityId);
    setIsLoading(false);
    if (!error) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-fit rounded-lg">
        <DialogHeader>
          <span className="flex gap-1 w-full justify-center">
            <p>Confirm Intent</p>
            <AlertOctagon></AlertOctagon>
          </span>
        </DialogHeader>
        <DialogDescription className="text-center">
          This action can not be undone.
        </DialogDescription>
        <div className="flex justify-center gap-3">
          <DialogClose asChild>
            <Button disabled={isLoading} variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            variant={"destructive"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEntityModal;
