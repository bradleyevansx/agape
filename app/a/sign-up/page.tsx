import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import SignUpInputs from "./SignUpInputs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader className="-mb-3">
          <CardTitle>Welcome!</CardTitle>
          <CardDescription className="border-b pb-2">
            Already have an account?
            <Link
              className="ml-1 text-blue-500 hover:text-blue-600 active:text-blue-600"
              href="/a/login"
            >
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpInputs></SignUpInputs>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
