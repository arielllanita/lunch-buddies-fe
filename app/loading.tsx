"use client";

import { RefreshCcw } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <RefreshCcw className="animate-spin" size={30} />
    </div>
  );
}
