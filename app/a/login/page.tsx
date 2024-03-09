import React from "react";
import LoginInputs from "./LoginInputs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="border-b pb-2">
            Dont already have an account?
            <Link
              className="ml-1 text-blue-500 hover:text-blue-600 active:text-blue-600"
              href={"/a/sign-up"}
            >
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginInputs></LoginInputs>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
