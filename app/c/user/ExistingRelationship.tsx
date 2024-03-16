import Text from "@/components/typography/Text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tables } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

interface Props {
  usersId: string;
  relationship: Tables<"relationship">;
}

const ExistingRelationship = ({ usersId, relationship }: Props) => {
  const [partner, setPartner] = useState<Tables<"profile"> | null>(null);
  useEffect(() => {
    const fetchAsync = async () => {
      const supabase = createClientComponentClient();
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", relationship.userIds.filter((x) => x !== usersId)[0])
        .single<Tables<"profile">>();
      setPartner(data);
    };
    fetchAsync();
  }, [relationship]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner</CardTitle>
      </CardHeader>
      <CardContent>
        {partner && (
          <Text variant="p">
            You have successfully linked your account with{" "}
            <b>{`${partner.firstName} ${partner.lastName}`}</b>.
          </Text>
        )}
      </CardContent>
    </Card>
  );
};

export default ExistingRelationship;
