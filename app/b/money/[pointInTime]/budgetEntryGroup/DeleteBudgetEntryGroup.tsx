import DeleteEntityModal from "@/components/crud/DeleteEntityModal";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import React from "react";

interface Props {
  budgetEntryGroupId: string;
}

const DeleteBudgetEntryGroup = ({ budgetEntryGroupId }: Props) => {
  return (
    <DeleteEntityModal
      trigger={
        <Button variant={"outline"}>
          <Trash2></Trash2>
        </Button>
      }
      tableName="budgetEntryGroup"
      entityId={budgetEntryGroupId}
    ></DeleteEntityModal>
  );
};

export default DeleteBudgetEntryGroup;
