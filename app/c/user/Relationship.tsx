import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { ReactNode, useEffect, useState } from "react";
import CreateRelationship from "./CreateRelationship";
import ExistingRelationship from "./ExistingRelationship";
import { Skeleton } from "@/components/ui/skeleton";
import { Tables } from "@/database.types";

interface Props {
  usersId: string | undefined;
}

const Relationship = ({ usersId }: Props) => {
  const [component, setComponent] = useState<ReactNode>(null);

  const fetchAsync = async () => {
    const supabase = createClientComponentClient();

    const { data, error } = await supabase
      .from("relationship")
      .select("*")
      .single<Tables<"relationship">>();

    if (!data) {
      setComponent(
        <CreateRelationship
          onRelationshipCreated={fetchAsync}
          usersId={usersId!}
        />
      );
    } else {
      setComponent(
        <ExistingRelationship usersId={usersId!} relationship={data} />
      );
    }
  };

  useEffect(() => {
    if (usersId) {
      fetchAsync();
    }
  }, [usersId]);

  if (!usersId) {
    return <Skeleton />;
  }

  return <>{component}</>;
};

export default Relationship;
