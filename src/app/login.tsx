"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function LoginForm({
  onSwitchToRegister,
}: {
  onSwitchToRegister: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    if (!validateEmail(loginEmail)) {
      setLoginError("Please enter a valid email.");
      return;
    }
    if (!loginPassword) {
      setLoginError("Password is required.");
      return;
    }
    setLoginLoading(true);
    try {
      // Replace with your real API endpoint
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setLoginError("");
      alert("Login successful!");
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <CardHeader>
        <CardTitle>Welcome to Shadcn UI</CardTitle>
        <CardDescription>
          This is a simple form using Shadcn UI components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2 relative">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pr-10"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-9 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <div className="flex justify-end mt-1">
              <a
                href="/forgot-password"
                className="text-s text-blue-600 hover:underline mb-8"
              >
                Forgot password?
              </a>
            </div>
          </div>
          {loginError && (
            <div className="text-red-600 text-xs mt-2">{loginError}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <Button
            variant="outline"
            className="w-1/2 mr-2"
            type="button"
            onClick={() => {
              setLoginEmail("");
              setLoginPassword("");
              setLoginError("");
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 ml-2"
            type="submit"
            disabled={loginLoading}
          >
            {loginLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="w-full text-center">
          <span className="text-sm">Don't have an account? </span>
          <button
            className="text-sm text-blue-600 hover:underline"
            type="button"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>
      </CardFooter>
    </form>
  );
}
