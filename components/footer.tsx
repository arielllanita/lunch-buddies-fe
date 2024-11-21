import { cn } from "@/lib/utils";
import React from "react";

export default function Footer({ className }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("py-2 bg-black", className)}>
      <p className="text-center text-white">Developed by: Innovuze Solutions Inc.</p>
    </div>
  );
}
