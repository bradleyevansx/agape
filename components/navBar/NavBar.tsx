import React from "react";
import SignOut from "../authState/SignOut";
import { ColorModeSwitch } from "../colorModeSwitch/ColorModeSwitch";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a href="#" className="mr-6 flex items-center space-x-2 text-lg">
            Agape
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Money
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Food
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Time
            </a>
            <a
              href="#"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Goals
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-2">
            <SignOut></SignOut>
            <ColorModeSwitch></ColorModeSwitch>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
