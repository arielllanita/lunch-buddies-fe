"use client";

import React, { createContext, useReducer } from "react";
import { IDashboardAction, IDashboardState, initState, reducer } from "./dashboard.reducer";

export const DashboardContext = createContext<{
  state: IDashboardState;
  dispatch: React.Dispatch<IDashboardAction>;
}>({ state: initState, dispatch: () => {} });

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>
  );
}
