"use client";

import Pantry from "./_components/pantry";
import Suppliers from "./_components/suppliers";
import { useReducer } from "react";
import { initState, reducer } from "./reducer";

/**
 * - filter dishes by supplier (check)
 * - fetch for existing pantry
 * - shape pantry as payload for submission
 * - submit pantry to api
 */

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className="flex flex-col gap-6 p-7">
      <h1 className="text-4xl">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <Suppliers dispatch={dispatch} state={state} />
        <Pantry dispatch={dispatch} state={state} />
      </div>
    </div>
  );
}
