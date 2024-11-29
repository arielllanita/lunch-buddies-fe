"use client";

import { IDishType } from "@/services/dish.service";
import { ISupplier } from "@/services/supplier.service";
import { useReducer } from "react";
import Pantry from "./_components/pantry";
import Suppliers from "./_components/suppliers";
import { uniqBy } from "lodash";

export type IDashboardState = {
  dishes: IDishType[];
  suppliers: ISupplier[];
  pantry: IDishType[];
  triggerFetch: number;
};

export type IDashboardAction = {
  type:
    | "ADD_DISH"
    | "ADD_TO_PANTRY"
    | "REMOVE_FROM_PANTRY"
    | "CLEAR_PANTRY"
    | "ADD_SUPPLIER"
    | "FILTER_DISH_BY_SUPPLIER"
    | "FILTER_DISH_BY_NAME"
    | "REFETCH_DISHES_SUPPLIERS";
  payload?: any;
};

const initState: IDashboardState = { dishes: [], suppliers: [], pantry: [], triggerFetch: 0 };

function reducer(state: IDashboardState, action: IDashboardAction) {
  switch (action.type) {
    case "ADD_DISH": {
      const dishes = uniqBy(state.dishes.concat(action.payload), "id");
      return { ...state, dishes };
    }
    case "ADD_SUPPLIER": {
      const suppliers = uniqBy(state.suppliers.concat(action.payload), "id");
      return { ...state, suppliers };
    }
    case "ADD_TO_PANTRY": {
      const pantry = uniqBy(state.pantry.concat(action.payload), "id");
      return { ...state, pantry };
    }
    case "REMOVE_FROM_PANTRY": {
      const pantry = state.pantry.filter((p) => p.id !== action.payload);
      return { ...state, pantry };
    }
    case "CLEAR_PANTRY": {
      return { ...state, pantry: [] };
    }
    case "FILTER_DISH_BY_SUPPLIER": {
      const dishes = state.dishes.filter((d) => d.dish_id.supplier.id === action.payload);
      return { ...state, dishes };
    }
    case "FILTER_DISH_BY_NAME": {
      const dishes = state.dishes.filter((d) =>
        d.dish_id.dish_name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, dishes };
    }
    case "REFETCH_DISHES_SUPPLIERS": {
      return { ...state, triggerFetch: state.triggerFetch + 1 };
    }

    default:
      return state;
  }
}

/**
 * - filter dishes by supplier
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
