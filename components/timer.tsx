import { cn } from "@/lib/utils";
import { Clock3 } from "lucide-react";
import React from "react";

export default function Timer({ className }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="bg-primary flex items-center justify-center space-x-1 text-white py-1 rounded-2xl">
        <Clock3 size={18} />
        <p className="text-[12px]">
          Pantry will close in: <strong>10:00:00</strong>
        </p>
      </div>
      <small className="text-[9px] italic text-white">
        Orders beyond time limit will no longer be entertained
      </small>
    </div>
  );
}
