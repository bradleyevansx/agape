import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { cookies } from "next/headers";

const layout = async ({ children }: { children: ReactNode }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/b/");
  }

  return <>{children}</>;
};

export default layout;
