"use client";


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import DashboardGuard from "./dashboard-guard";
import LogoutButton from "./logout";

export default function Dashboard() {
  const router = useRouter();
  return (
    <DashboardGuard>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Store Dashboard</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow text-center">
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow text-center">
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-gray-600">Orders</div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mb-4">
              <Button variant="outline" onClick={() => router.push("/register")}> 
                Go to Register
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}> 
                Go to Login
              </Button>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => router.push("/register")}> 
                Add Product
              </Button>
              <Button onClick={() => router.push("/orders")}>View Orders</Button>
            </div>
            <LogoutButton />
          </CardContent>
        </Card>
      </div>
    </DashboardGuard>
  );
}
