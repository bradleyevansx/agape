import ToLogin from "@/components/authState/ToLogin";
import React from "react";

const page = async () => {
  return (
    <div>
      You are not authorized <ToLogin></ToLogin>
    </div>
  );
};

export default page;
