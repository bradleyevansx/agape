"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function UpdateAvatar() {
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    setUploading(true);

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const supabase = createClientComponentClient();

    const user = await supabase.auth.getUser();
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }
    const { error } = await supabase
      .from("profile")
      .update({ avatarPath: filePath })
      .eq("id", user.data.user?.id);
    router.refresh();
    setUploading(false);
  }

  return (
    <div className="mt-4 flex justify-center">
      <label
        className="h-10 hover:cursor-pointer px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        htmlFor="single"
      >
        {uploading ? "Uploading ..." : "Upload"}
      </label>
      <input
        style={{ height: "0", width: "0", visibility: "hidden" }}
        type="file"
        id="single"
        accept="image/*"
        onChange={(e) => uploadAvatar(e)}
        disabled={uploading}
      />
    </div>
  );
}
