"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
import { PomodoroTimer } from "./pomodoro";
import { Menu } from "./menu";
import Image from "next/image";
import Link from "next/link";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({ isCollapsed,
    onResetWidth
}: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="flex w-full items-center bg-background px-3 py-2 justify-between dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2 ">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-2 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        {isCollapsed && (
            <MenuIcon
            role="button"
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
        )} 
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
  <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0">
    <Image
      src="/banana.gif"
      alt="cat"
      width={80}
      height={20}
      unoptimized
      className="block dark:hidden"
    />
    <Image
    src="/banana.gif"
    alt="cat-dark"
    width={80}
    height={20}
    unoptimized
    className="hidden dark:block"
  />
  </Link>
  <PomodoroTimer />
  <Publish initialData={document} />
  <Menu documentId={document._id} />
</div>

        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

// add <pomodor /> component after <menu> or in <menu>