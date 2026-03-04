"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

function AdminGuard({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const pathname = usePathname();

  // Skip auth guard for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 lg:p-8 bg-gray-50">{children}</div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminGuard>{children}</AdminGuard>
    </SessionProvider>
  );
}
