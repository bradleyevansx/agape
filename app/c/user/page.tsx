"use client";
import UpdateEntity from "@/components/crud/UpdateEntity";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import Relationship from "./Relationship";

const page = () => {
  const supabase = createClientComponentClient();

  const [profile, setProfile] = useState<Tables<"profile"> | null>(null);

  useEffect(() => {
    const fetchAsync = async () => {
      const user = await supabase.auth.getUser();
      const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.data.user?.id)
        .single<Tables<"profile">>();
      setProfile(data);
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
  }, []);

  return (
    <main className="flex p-4 min-h-app">
      <article className="w-full">
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
    </main>
  );
};

export default page;
