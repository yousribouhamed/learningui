"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Get access_token from URL (supabase sends it as query param)
      const access_token = searchParams.get("access_token") || searchParams.get("token");
      if (!access_token) throw new Error("Missing access token. Please use the link from your email.");
      // Set the session with the access_token
      const { error: sessionError } = await supabase.auth.setSession({ access_token, refresh_token: access_token });
      if (sessionError) throw new Error(sessionError.message);
      // Now update the password
      const { data, error: supabaseError } = await supabase.auth.updateUser({ password });
      if (supabaseError) throw new Error(supabaseError.message);
      setSuccess("Password reset successful! You can now log in.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <form onSubmit={handleReset}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password">New Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password">Confirm Password</label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
              {success && <div className="text-green-600 text-xs mt-2">{success}</div>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
            <Separator className="my-2" />
            <div className="w-full text-center">
              <a
                className="text-sm text-blue-600 hover:underline"
                href="/"
              >
                Back to Login
              </a>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
