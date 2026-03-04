"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import config from "../../../restaurant.config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "&#128200;" },
  { href: "/admin/orders", label: "Orders", icon: "&#128230;" },
  { href: "/admin/menu", label: "Menu Items", icon: "&#127860;" },
  { href: "/admin/categories", label: "Categories", icon: "&#128193;" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex-shrink-0 hidden lg:block">
      <div className="p-6">
        <Link href="/admin" className="text-lg font-bold">
          {config.name}
        </Link>
        <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <span dangerouslySetInnerHTML={{ __html: item.icon }} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-800">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
