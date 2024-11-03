"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className="max-w-6xl pt-2 mt-[-50px] space-y-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-7xl text-[#5c2c2b] dark:text-[#faf5ef] font-bold">
                Welcome to Journal Pages
            </h1>
            <h3 className="md:text-2xl font-medium text-[#5c2c2b] dark:text-[#faf5ef]">
                Unwind, Reflect, Grow. One Page at a Time.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner />
                </div>
            )}

            {isAuthenticated && !isLoading && (
                <Button asChild className="bg-[#5c2c2b] hover:bg-[#e0dcd6] text-[#faf5ef] dark:hover:bg-[#c59c86] dark:bg-[#faf5ef] dark:text-[#5c2c2b]">
                    <Link href="/documents">
                        Enter Your Journals
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button className="bg-[#8a9f6e] hover:bg-[#e0dcd6] text-[#faf5ef] dark:hover:bg-[#c59c86] dark:bg-[#faf5ef] dark:text-[#5c2c2b]">
                        Start Journaling!
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    );
};
