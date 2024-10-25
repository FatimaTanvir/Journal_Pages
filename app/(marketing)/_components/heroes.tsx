import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl" >
        <div className="flec items-center">
            <div className="relative w-[300px] sm:w-[350px] sm:-[350px] md:h-[400px] mdw-[400px]">
                <Image
                src = "/documents.png"
                fill
                className="object-contain dark:hidden"
                alt="Documents"
                />
                <Image
                src = "/documents-dark.png"
                fill
                className="object-contain hidden dark:block"
                alt="Documents"
                />
            </div>
        </div>
    Heroes</div>

  )
};

