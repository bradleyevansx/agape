import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "@/components/navBar/NavBar";
import { Tables } from "@/database.types";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/a/no-access");
  }

  const { data } = await supabase
    .from("relationship")
    .select("*")
    .single<Tables<"relationship">>();

  if (!data) {
    redirect("/c/user");
  }

  return (
    <main className="flex-1 min-h-app">
      <NavBar></NavBar>
      {children}
    </main>
  );
}
