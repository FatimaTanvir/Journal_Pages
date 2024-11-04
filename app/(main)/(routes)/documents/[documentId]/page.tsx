"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { use } from "react";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<"documents">;
  }>;
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  // Unwrap params using React.use()
  const { documentId } = use(params);

  // Dynamically import the Editor component without SSR
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  // Fetch the document based on the documentId
  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });

  // Define mutation to update the document content
  const update = useMutation(api.documents.update);

  // Handle content change and update the document
  const onChange = (content: string) => {
    try {
      update({
        id: documentId,
        content,
      });
    } catch (error) {
      console.error("Failed to update document:", error);
      // Optional: display an error message to the user here
    }
  };

  if (document === undefined) {
    // Loading state with skeleton components
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    // Document not found state
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      {/* Use optional chaining in case coverImage is undefined */}
      <Cover url={document.coverImage ?? ""} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
