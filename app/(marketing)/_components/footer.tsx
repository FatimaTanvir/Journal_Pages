import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-4 bg-[#faf5ef] dark:bg-[#1F1F1F] text-[#5c2c2b] dark:text-[#faf5ef] z-[99999]">
      <Logo />
      <div className=" flex w-full items-center justify-end gap-x-2  text-[#5c2c2b] dark:text-[#faf5ef] md:ml-auto">
      <Button asChild variant="ghost" size="sm" className="bg-[#5c2c2b] hover:bg-[#e0dcd6] text-[#faf5ef] dark:hover:bg-[#c59c86] dark:bg-[#faf5ef] dark:text-[#5c2c2b]">
        <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0">
        Click for a surprise!
        </Link>
      </Button>
      </div>
    </div>
  );
};
