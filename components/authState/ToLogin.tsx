import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const ToLogin = () => {
  return (
    <Link href={"/a/login"}>
      <Button>Login</Button>
    </Link>
  );
};

export default ToLogin;
