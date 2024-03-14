import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import Links from "./Links";

const MobileNavSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className={"hover:cursor-pointer"}></Menu>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="mb-3">
          <SheetTitle>Agape</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col items-center gap-3">
          <Links></Links>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavSheet;
