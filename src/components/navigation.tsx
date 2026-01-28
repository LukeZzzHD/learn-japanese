"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Brain, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Add", icon: Plus },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/edit", label: "Edit", icon: Pencil },
];

export function Navigation() {
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="mx-auto flex h-16 max-w-[480px] items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
