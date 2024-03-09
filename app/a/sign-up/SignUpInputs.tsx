"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface SignUpState {
  email: string;
  password: string;
  passwordCheck: string;
}

const SignUpInputs = () => {
  const [errorMessage, setErrorMessage] = useState<AuthError | null>(null);
  const [newUser, setNewUser] = useState<SignUpState>({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleChange = (value: Partial<SignUpState>) => {
    setNewUser((prev) => {
      return { ...prev, ...value };
    });
  };

  const signUp = async () => {
    setIsLoading(true);
    if (newUser.password !== newUser.passwordCheck) {
      const err = new AuthError("Passwords do not match.");

      setErrorMessage(err);
      setIsLoading(false);
      return;
    }

    if (newUser.password.length < 6) {
      const err = new AuthError("Password must be at least 6 characters.");

      setErrorMessage(err);
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
      return;
    }

    if (data.user?.aud === "authenticated") {
      router.push("/a/confirm-email");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-64 sm:w-80">
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage.message}</p>
      )}
      <span>
        <Label>Email</Label>
        <Input
          disabled={isLoading}
          value={newUser.email}
          placeholder="email@agape.com"
          onChange={(e) => handleChange({ email: e.currentTarget.value })}
        ></Input>
      </span>
      <span>
        <Label>Password</Label>
        <Input
          disabled={isLoading}
          value={newUser.password}
          onChange={(e) => handleChange({ password: e.currentTarget.value })}
        ></Input>
      </span>
      <span>
        <Label>Confirm Password</Label>
        <Input
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.nativeEvent.code === "Enter") {
              signUp();
            }
          }}
          value={newUser.passwordCheck}
          onChange={(e) =>
            handleChange({ passwordCheck: e.currentTarget.value })
          }
        ></Input>
      </span>

      <Button isLoading={isLoading} className="mt-2 ml-auto" onClick={signUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUpInputs;
