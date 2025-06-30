import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  // Get the access token from the URL hash or cookies (Supabase sets it after reset)
  // In Next.js, you may need to pass the access_token from the client
  const access_token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!password || !access_token) {
    return NextResponse.json({ message: "Missing password or access token." }, { status: 400 });
  }
  const { data, error } = await supabase.auth.updateUser({ password }, { accessToken: access_token });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: "Password updated successfully!" });
}
