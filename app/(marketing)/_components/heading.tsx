"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text -3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Documents, & Plans. 
                Unified. Welcome to 
                <span className="underline"> Daily Pages</span>
            </h1>
            <h3 className="text-base sm:text-xl md:test-2xl font-medium">
                Daily Pages is the place where you can store and work on your projects.
            </h3>
            <Button>
                Enter Daily Pages 
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    )
}