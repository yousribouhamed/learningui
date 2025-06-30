import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(req: NextRequest) {
  const { email, password, wilaya, dob } = await req.json();
  if (!email || !password || !wilaya || !dob) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }
  // Register user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { wilaya, dob }
    }
  });
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: "Registration successful! Please check your email to confirm your account." });
}
