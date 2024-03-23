import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { Tables } from "@/database.types";
import ProfileAvatar from "./ProfileAvatar";

interface Props {
  userId: string;
}

const PartnerAvatar = async ({ userId }: Props) => {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("relationship")
    .select("*")
    .single<Tables<"relationship">>();

  return (
    <ProfileAvatar
      userId={data?.userIds.find((x) => x !== userId)!}
    ></ProfileAvatar>
  );
};

export default PartnerAvatar;
