"use client";

import { Tables } from "@/database.types";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useMemo, useState } from "react";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  userId: string;
  size?: number | string;
}

const ProfileAvatar = ({ userId, size = 45 }: Props) => {
  const supabase = createClientComponentClient();

  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAsync = async () => {
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single<Tables<"profile">>();
      setProfile(data);

      if (data?.avatarPath) {
        const { data: avatarData, error } = await supabase.storage
          .from("avatar")
          .download(data?.avatarPath);

        if (error) {
          throw error;
        }
        setUrl(URL.createObjectURL(avatarData));
      }
      setIsLoading(false);
    };
    fetchAsync();
  }, [userId]);

  const firstNameLetter = useMemo(() => {
    return profile && profile.firstName
      ? profile?.firstName[0].toUpperCase()
      : "U";
  }, [profile]);
  const lastNameLetter = useMemo(() => {
    return profile && profile.lastName
      ? profile?.lastName[0].toUpperCase()
      : "K";
  }, [profile]);
  return (
    <>
      {isLoading ? (
        <>
          <Avatar style={{ height: size, width: size }}>
            <AvatarFallback className="animate-pulse"></AvatarFallback>
          </Avatar>
        </>
      ) : (
        <Avatar style={{ height: size, width: size }}>
          <AvatarImage src={url}></AvatarImage>
          <AvatarFallback>{`${firstNameLetter}${lastNameLetter}`}</AvatarFallback>
        </Avatar>
      )}
    </>
  );
};

export default ProfileAvatar;
