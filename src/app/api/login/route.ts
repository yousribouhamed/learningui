import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }
  // Authenticate user with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
  // Optionally, return user info
  return NextResponse.json({ message: "Login successful!", user: data.user });
}
