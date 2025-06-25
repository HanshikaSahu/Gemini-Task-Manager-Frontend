'use client';

import { useState } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-purple-700 hover:text-purple-900 transition"
        >
          🧠 Gemini Tasks
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks pathname={pathname} />
          <AuthButtons />
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pb-4 pt-2 space-y-4">
          <div className="flex flex-col gap-3">
            <NavLinks pathname={pathname} mobile onClick={closeMenu} />
            <AuthButtons mobile />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLinks({
  pathname,
  mobile = false,
  onClick,
}: {
  pathname: string;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    { href: "/generate", label: "Generate" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className={`px-3 py-1 rounded-lg transition ${
            pathname === link.href
              ? "bg-purple-100 text-purple-700 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          } ${mobile ? "block text-base" : "text-sm"}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

function AuthButtons({ mobile = false }: { mobile?: boolean }) {
  const { user } = useUser();

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            className={`bg-purple-600 hover:bg-purple-700 text-white ${
              mobile ? "w-full text-base" : "text-sm"
            }`}
          >
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div
          className={`flex ${
            mobile ? "flex-col items-start gap-3 pt-2" : "items-center gap-2"
          }`}
        >
          <span
            className={`text-sm text-gray-600 ${
              mobile ? "text-base" : ""
            } whitespace-nowrap`}
          >
            Hi, <span className="font-medium">{user?.firstName || user?.username}</span>
          </span>
          <SignOutButton>
            <Button
              variant="destructive"
              size="sm"
              className={mobile ? "w-full text-base" : ""}
            >
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </>
  );
}
