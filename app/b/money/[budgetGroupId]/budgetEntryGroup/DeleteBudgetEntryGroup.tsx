import DeleteEntityModal from "@/components/crud/DeleteEntityModal";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import React from "react";

interface Props {
  budgetGroupId: string;
}

const DeleteBudgetEntryGroup = ({ budgetGroupId }: Props) => {
  return (
    <DeleteEntityModal
      trigger={
        <Button variant={"outline"}>
          <Trash2></Trash2>
        </Button>
      }
      tableName="budgetEntryGroup"
      entityId={budgetGroupId}
    ></DeleteEntityModal>
  );
};

export default DeleteBudgetEntryGroup;
