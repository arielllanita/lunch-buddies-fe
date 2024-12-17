"use client";

import useSockets from "@/hooks/use-sockets";
import React, { createContext, useEffect, useReducer } from "react";
import { type Socket } from "socket.io-client";
import { IHomepageState, IHompageAction, initState, reducer } from "./homepage.reducer";
import { getMenuToday } from "@/actions/menu.actions";
import { getOrders } from "@/actions/order.actions";

export type HomepageContextType = {
  state: IHomepageState;
  dispatch: React.Dispatch<IHompageAction>;
  socket: Socket | null;
};

export const HomepageContext = createContext<HomepageContextType>({
  state: initState,
  dispatch: () => {},
  socket: null,
});

export function HomepageProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { socket } = useSockets();

  useEffect(() => {
    (async () => {
      const menus = await getMenuToday();
      dispatch({ type: "FETCH_MENU_TODAY", payload: menus });

      const userOrders = await getOrders();
      dispatch({ type: "FETCH_USER_ORDER", payload: userOrders });
    })();
  }, []);

  // Initialize websocket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to websocket server");
    });

    socket.on("receive_menu_today", (menus) => {
      if (menus != null) {
        dispatch({ type: "FETCH_MENU_TODAY", payload: menus });
      }
    });

    // socket.on("receive_user_order", (menus) => {
    //   if (menus != null) {
    //     dispatch({ type: "FETCH_MENU_TODAY", payload: menus });
    //   }
    // });

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
