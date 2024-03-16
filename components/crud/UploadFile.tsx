"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Text from "../typography/Text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { generate_uuidv4 } from "@/lib/uuid";
import { Tables } from "@/database.types";

interface Props {
  fileType: string;
  label: string;
  initialValue: ReactNode;
}

const UploadFile = ({ fileType, label, initialValue }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState<string | undefined>(undefined);

  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchAsync = async () => {
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.data.user.id)
          .single<Tables<"profile">>();

        const path = `${profile?.avatarPath}`;
        const { data } = await supabase.storage
          .from("avatar")
          .createSignedUrl(path, 60);
        console.log(data);
        setImage(data?.signedUrl);
      }
    };
    fetchAsync();
  }, [supabase]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    const user = await supabase.auth.getUser();

    const uuid = generate_uuidv4();

    const { data, error } = await supabase.storage
      .from("avatar")
      .upload(`${user.data.user?.id}/${uuid}.png`, file, {
        cacheControl: "3600",
      });
    setImage(data?.path);
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing && (
        <TooltipProvider>
          <Tooltip delayDuration={10}>
            <TooltipTrigger>
              <Avatar
                onClick={() => setIsEditing(true)}
                className="h-40 w-40 hover:cursor-pointer"
              >
                <AvatarImage src={image}></AvatarImage>
                <AvatarFallback>BE</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Click to upload to avatar image
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {isEditing && (
        <>
          <Label>{label}</Label>
          <Input onChange={handleUpload} accept=".png" type={fileType}></Input>
        </>
      )}
    </>
  );
};

export default UploadFile;
