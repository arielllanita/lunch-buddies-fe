import React from "react";
import { twMerge } from "tailwind-merge";

export default function Footer({ className }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={twMerge("py-2 bg-black", className)}>
      <p className="text-center text-white">Developed by: Innovuze Solutions Inc.</p>
    </div>
  );
}
