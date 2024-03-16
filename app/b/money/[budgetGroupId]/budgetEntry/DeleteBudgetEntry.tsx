import DeleteEntityModal from "@/components/crud/DeleteEntityModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { X } from "lucide-react";
import React from "react";

interface Props {
  budgetEntryId: string;
}

const DeleteBudgetEntry = ({ budgetEntryId }: Props) => {
  return (
    <DeleteEntityModal
      trigger={<X className="hover:cursor-pointer" size={13}></X>}
      tableName="budgetEntry"
      entityId={budgetEntryId}
    ></DeleteEntityModal>
  );
};

export default DeleteBudgetEntry;
