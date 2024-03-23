"use client";

import UpdateEntity from "@/components/crud/UpdateEntity";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import Relationship from "./Relationship";
import { UserResponse } from "@supabase/supabase-js";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import UpdateAvatar from "@/components/crud/UpdateAvatar";
import { Loader2, Loader2Icon } from "lucide-react";

const UserPage = () => {
  const supabase = createClientComponentClient();

  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAsync = async () => {
      const user = await supabase.auth.getUser();
      setUser(user);
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.data.user?.id)
        .single<Tables<"profile">>();
      setProfile(data);
      setIsLoading(false);
    };

    fetchAsync();

    const changes = supabase
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public" },
        (payload: any) => {
          const { table } = payload;
          if (table === "profile") {
            setProfile(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [supabase]);

  if (isLoading) {
    return (
      <Loader2Icon className="animate-spin fixed top-1/2 left-1/2"></Loader2Icon>
    );
  }

  return (
    <article className="w-full px-4">
      <div className="flex flex-col items-center">
        {user && (
          <span className="w-60 h-60">
            <ProfileAvatar
              size={"100%"}
              userId={user.data.user!.id}
            ></ProfileAvatar>
          </span>
        )}
        <UpdateAvatar></UpdateAvatar>
      </div>
      <UpdateEntity
        table="profile"
        modifyingProperty="firstName"
        entityId={profile?.id}
        initialValue={profile?.firstName}
        placeHolder="First Name"
      ></UpdateEntity>
      <UpdateEntity
        table="profile"
        modifyingProperty="lastName"
        entityId={profile?.id}
        initialValue={profile?.lastName}
        placeHolder="Last Name"
      ></UpdateEntity>
      <div className="mt-3">
        <Relationship usersId={profile?.id}></Relationship>
      </div>
    </article>
  );
};

export default UserPage;
