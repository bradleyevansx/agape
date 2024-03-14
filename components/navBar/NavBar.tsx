"use client";

import React, { useEffect, useState } from "react";
import SignOut from "../authState/SignOut";
import { ColorModeSwitch } from "../colorModeSwitch/ColorModeSwitch";
import Link from "next/link";
import BreadCrumbs from "./BreadCrumbs";
import { Menu } from "lucide-react";
import Links from "./Links";
import MobileNavSheet from "./MobileNavSheet";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Sign } from "crypto";
import ToLogin from "../authState/ToLogin";
const NavBar = () => {
  const supabase = createClientComponentClient();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    })();
  });

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex md:hidden">
            <MobileNavSheet></MobileNavSheet>
          </div>
          <div className="mr-4 hidden md:flex">
            <a href="#" className="mr-6 flex items-center space-x-2 text-lg">
              Agape
            </a>
            <nav className="flex items-center gap-6 text-sm">
              <Links></Links>
            </nav>
          </div>
          <div className="flex items-center justify-between space-x-2 md:justify-end ml-auto">
            <nav className="flex items-center gap-2">
              {loggedIn ? <SignOut></SignOut> : <ToLogin></ToLogin>}
              <ColorModeSwitch></ColorModeSwitch>
            </nav>
          </div>
        </div>
      </header>
      <BreadCrumbs></BreadCrumbs>
    </>
  );
};

export default NavBar;
