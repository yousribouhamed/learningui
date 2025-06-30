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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane"
];

function validateEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function RegisterForm({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regWilaya, setRegWilaya] = useState("");
  const [regDob, setRegDob] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState("");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");
    if (!validateEmail(regEmail)) {
      setRegError("Please enter a valid email.");
      return;
    }
    if (!regWilaya) {
      setRegError("Please select a wilaya.");
      return;
    }
    if (!regDob) {
      setRegError("Please enter your date of birth.");
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }
    setRegLoading(true);
    try {
      // Replace with your real API endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail,
          wilaya: regWilaya,
          dob: regDob,
          password: regPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setRegSuccess("Registration successful! You can now log in.");
      setRegError("");
      // Optionally, switch to login form
      // onSwitchToLogin();
    } catch (err: any) {
      setRegError(err.message);
    } finally {
      setRegLoading(false);
    }
  }

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    setResetMessage("");
    setResetLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send reset email");
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setResetMessage(err.message);
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleRegister}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="reg-email">Email</label>
              <Input
                id="reg-email"
                type="email"
                placeholder="Enter your email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <label htmlFor="wilaya">Wilaya</label>
              <Select value={regWilaya} onValueChange={setRegWilaya}>
                <SelectTrigger id="wilaya" className="w-full">
                  <SelectValue placeholder="Select wilaya" />
                </SelectTrigger>
                <SelectContent>
                  {wilayas.map((w) => (
                    <SelectItem key={w} value={w}>
                      {w}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="dob">Date of Birth</label>
              <Input
                id="dob"
                type="date"
                value={regDob}
                onChange={(e) => setRegDob(e.target.value)}
              />
            </div>
            <div className="space-y-2 relative">
              <label htmlFor="reg-password">Password</label>
              <Input
                id="reg-password"
                type={showRegPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={
                  showRegPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowRegPassword((v) => !v)}
                className="absolute right-2 top-9 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {regSuccess && (
              <div className="text-green-600 text-xs mt-2">
                {regSuccess} Please check your email to confirm your account.
              </div>
            )}
            {regError && (
              <div className="text-red-600 text-xs mt-2">{regError}</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            type="submit"
            disabled={regLoading}
          >
            {regLoading ? "Loading..." : "Register"}
          </Button>
          <Separator className="my-2" />
          <div className="w-full text-center">
            <span className="text-sm">Already have an account? </span>
            <button
              className="text-sm text-blue-600 hover:underline"
              type="button"
              onClick={onSwitchToLogin}
            >
              Login
            </button>
          </div>
          <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline mt-2"
                onClick={() => setResetDialogOpen(true)}
              >
                Forgot password?
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email to receive a password reset link.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  required
                />
                {resetMessage && <div className="text-xs text-center text-green-600">{resetMessage}</div>}
                <DialogFooter>
                  <Button type="submit" disabled={resetLoading} className="w-full">
                    {resetLoading ? "Sending..." : "Send Reset Email"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="w-full">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </form>
    </>
  );
}
