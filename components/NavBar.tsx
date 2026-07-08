"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, BarChart3, Settings } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Island", icon: Sparkles },
  { href: "/stats", label: "Stats", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4">
        <div className="glass-card-solid rounded-cozylg flex justify-around items-center py-2 shadow-soft">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-cozy transition-colors duration-300 ${
                  active ? "bg-mint/40 text-slateplum" : "text-lavendergrey"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="text-[11px] font-semibold tracking-wide">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop left rail */}
      <nav className="hidden md:flex fixed top-0 left-0 h-full w-24 flex-col items-center justify-center gap-4 z-40 p-4">
        <div className="glass-card-solid rounded-cozylg flex flex-col items-center gap-2 py-6 px-3 shadow-soft">
          {ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-3 py-3 rounded-cozy transition-colors duration-300 w-full ${
                  active ? "bg-mint/40 text-slateplum" : "text-lavendergrey"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="text-[10px] font-semibold tracking-wide">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
