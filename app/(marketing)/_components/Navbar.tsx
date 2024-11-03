"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-[99999] mx-auto flex w-full items-center text-[#5c2c2b] bg-[#faf5ef] p-4 dark:bg-[#1F1F1F] dark:text-[#faf5ef]", // Changed p-6 to p-4 for thinner navbar
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-end md:ml-auto">
        <div className="flex items-center gap-x-2">
          {isLoading && <Spinner />}
          {!isLoading && !isAuthenticated && (
            <SignInButton mode="modal">
              <Button size="sm" className="bg-[#8a9f6e] hover:bg-[#e0dcd6] text-[#faf5ef] dark:hover:bg-[#c59c86] dark:bg-[#faf5ef] dark:text-[#5c2c2b]">
                Log in
              </Button>
            </SignInButton>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/documents">Enter home</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
