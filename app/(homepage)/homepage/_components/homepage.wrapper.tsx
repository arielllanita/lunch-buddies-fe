"use client";

import React, { useContext } from "react";
import { HomepageContext, HomepageContextType } from "../_context/homepage.context";

export default function HomepageWrapper({
  children,
}: {
  children: (context: HomepageContextType) => React.ReactNode;
  //   children: (context: string) => React.ReactNode;
}) {
  const context = useContext(HomepageContext);

  console.log("ctx", context);

  return children(context);
}
