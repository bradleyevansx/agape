"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const SignOut = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.push("/a/login");
    setIsLoading(false);
  };

  return (
    <DropdownMenuItem disabled={isLoading} onClick={handleSignOut}>
      Sign Out
    </DropdownMenuItem>
  );
};

export default SignOut;
