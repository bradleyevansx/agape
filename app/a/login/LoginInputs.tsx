"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LoginState {
  email: string;
  password: string;
}

const LoginInputs = () => {
  const [login, setLogin] = useState<LoginState>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const handleChange = (value: Partial<LoginState>) => {
    if (isLoading) {
      return;
    }
    setLogin((prev) => {
      return { ...prev, ...value };
    });
  };

  const signIn = async () => {
    if (login.email.length === 0 || login.password.length === 0) {
      const err = new AuthError("Must enter valid username and password.");

      setErrorMessage(err);
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: login.email,
      password: login.password,
    });
    if (!error) {
      router.push("/b/");
    } else {
      setErrorMessage(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 w-60 sm:w-80">
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage.message}</p>
      )}
      <span>
        <Label>Email</Label>
        <Input
          disabled={isLoading}
          value={login.email}
          onChange={(e) => handleChange({ email: e.currentTarget.value })}
          className="mb-2"
          placeholder="email@agape.com"
        ></Input>
      </span>
      <span>
        <Label>Password</Label>
        <Input
          enterKeyHint="enter"
          disabled={isLoading}
          value={login.password}
          onKeyDown={(e) => {
            if (e.nativeEvent.code === "Enter") {
              signIn();
            }
          }}
          onChange={(e) => handleChange({ password: e.currentTarget.value })}
          placeholder="password"
        />
      </span>
      <Button isLoading={isLoading} className="ml-auto mt-2" onClick={signIn}>
        Login
      </Button>
    </div>
  );
};

export default LoginInputs;
