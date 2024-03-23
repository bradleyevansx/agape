import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProfileAvatar from "../profile/ProfileAvatar";
import SignOut from "../authState/SignOut";
import Link from "next/link";
const Settings = async () => {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();

  let profile;

  if (user) {
    profile = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.data.user?.id)
      .single<Tables<"profile">>();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar userId={user.data.user!.id}></ProfileAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/c/user"}>Settings</Link>
        </DropdownMenuItem>
        <SignOut></SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Settings;
