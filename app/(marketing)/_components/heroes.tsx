import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex max-w-4xl flex-col items-center justify-center">
      <div className="flex items-center">
      <div className="relative h-[25rem] w-[25rem] sm:w-[30rem] md:w-[25rem]">
          <Image
            src="/landing.gif"
            fill
            unoptimized
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <Image
            src="/landing-dark.gif"
            fill
            unoptimized
            className="hidden object-contain dark:block"
            alt="Documents"
          />
        </div>
      </div>
    </div>
  );
};

