"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import LoginForm from "./login";
import RegisterForm from "./register";

export default function Home() {
  const [form, setForm] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-[350px]">
        {form === "login" ? (
          <LoginForm onSwitchToRegister={() => setForm("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setForm("login")} />
        )}
      </Card>
    </div>
  );
}
