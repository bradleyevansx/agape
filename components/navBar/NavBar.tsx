import React, { ChangeEvent, useEffect, useState } from "react";
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
import UpdateAvatar from "@/components/crud/UpdateAvatar";
import { cookies } from "next/headers";
import { Tables } from "@/database.types";
import ProfileAvatar from "../profile/ProfileAvatar";
import Settings from "./Settings";
const NavBar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

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
              {data.session && <Settings></Settings>}
            </nav>
          </div>
        </div>
      </header>
      <BreadCrumbs></BreadCrumbs>
    </>
  );
};

export default NavBar;
