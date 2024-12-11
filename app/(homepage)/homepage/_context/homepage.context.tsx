"use client";

import useSockets from "@/hooks/use-sockets";
import React, { createContext, useEffect, useReducer } from "react";
import { type Socket } from "socket.io-client";
import { IHomepageState, IHompageAction, initState, reducer } from "./homepage.reducer";

export const HomepageContext = createContext<{
  state: IHomepageState;
  dispatch: React.Dispatch<IHompageAction>;
  socket: Socket | null;
}>({ state: initState, dispatch: () => {}, socket: null });

export function HomepageProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { socket } = useSockets();

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to websocket server");
      socket.emit("fetch_menu_today");
    });

    socket.on("receive_menu_today", (menus) => {
      console.log("menus", menus);
    });

    return () => {
      socket.off("receive_menu_today");
    };
  }, [socket]);

  return (
    <HomepageContext.Provider value={{ state, dispatch, socket }}>
      {children}
    </HomepageContext.Provider>
  );
}
