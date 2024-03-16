import Text from "@/components/typography/Text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tables } from "@/database.types";
import { isUUID } from "@/lib/uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  onRelationshipCreated: () => void;
  usersId: string;
}

const CreateRelationship = ({ usersId, onRelationshipCreated }: Props) => {
  const router = useRouter();
  const clipBoard = navigator.clipboard;

  const handleCopyToClipboard = () => {
    clipBoard.writeText(usersId);
    toast.info("Code has been copied to clipboard.");
  };

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkAsync = async () => {
    if (code.length === 0) {
      toast.error("Please enter a code.");
      return;
    } else if (!isUUID(code)) {
      toast.error("Please enter a valid code.");
      return;
    } else if (code === usersId) {
      toast.error("Do not enter your own code.");
      return;
    }
    const supabase = createClientComponentClient();
    setIsLoading(true);
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", code)
      .single<Tables<"profile">>();
    if (data) {
      const { error: response } = await supabase
        .from("relationship")
        .insert({ userIds: [usersId, data.id] });
      if (!response) {
        await onRelationshipCreated();
      }
    } else {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link partners account</CardTitle>
        <CardContent className="p-0">
          <Text variant="muted">
            Your account is not yet linked to your partners. To link you and
            your partners account either paste their code below or tell past
            your code in the same spot on their account.{" "}
            <b className="text-neutral-600">
              Do not share this code with anyone.
            </b>
          </Text>
          <div className="bg-neutral-200 rounded w-fit p-2 relative mx-auto mt-2">
            <p className="text-xs font-medium leading-none">{usersId}</p>
            <span
              onClick={handleCopyToClipboard}
              className="absolute hover:cursor-pointer -top-2 -right-2 bg-card p-1 rounded-lg border"
            >
              <Copy size={12}></Copy>
            </span>
          </div>
          <div className="mt-2">
            <Label>Partner's Code</Label>
            <div className="flex gap-2">
              <Input
                disabled={isLoading}
                onChange={(e) => setCode(e.currentTarget.value)}
                value={code}
                placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              ></Input>
              <Button disabled={isLoading} onClick={handleLinkAsync}>
                Link
              </Button>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateRelationship;
