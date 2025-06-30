"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  return (
    <Button variant="outline" onClick={handleLogout} className="w-full mt-4">
      Logout
    </Button>
  );
}
