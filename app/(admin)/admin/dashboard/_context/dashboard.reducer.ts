import type { Supplier, Dish } from "@prisma/client";
import { uniqBy } from "lodash";

export type IDashboardState = {
  dishes: Dish[];
  suppliers: Supplier[];
  pantry: (Dish & { dish_availability: number })[];
  isPantryAlreadyAdded: boolean;
};

export type IDashboardAction = {
  type:
    | "ADD_DISH"
    | "ADD_TO_PANTRY"
    | "EDIT_PANTRY"
    | "REMOVE_FROM_PANTRY"
    | "CLEAR_PANTRY"
    | "ADD_SUPPLIER"
    | "IS_PANTRY_CLOSE";
  payload?: any;
};

export const initState: IDashboardState = {
  dishes: [],
  suppliers: [],
  pantry: [],
  isPantryAlreadyAdded: false,
};

export function reducer(state: IDashboardState, action: IDashboardAction) {
  switch (action.type) {
    case "ADD_DISH": {
      return { ...state, dishes: action.payload };
    }
    case "ADD_SUPPLIER": {
      const suppliers = uniqBy(state.suppliers.concat(action.payload), "id");
      return { ...state, suppliers };
    }
    case "ADD_TO_PANTRY": {
      const pantry = uniqBy(state.pantry.concat(action.payload), "id");
      return { ...state, pantry };
    }
    case "EDIT_PANTRY": {
      const payload = action.payload;

      const pantry = state.pantry.map((p) => {
        return p.id === payload.id ? payload : p;
      });
      return { ...state, pantry };
    }
    case "REMOVE_FROM_PANTRY": {
      const pantry = state.pantry.filter((p) => p.id !== action.payload);
      return { ...state, pantry };
    }
    case "CLEAR_PANTRY": {
      return { ...state, pantry: [] };
    }
    case "IS_PANTRY_CLOSE": {
      return { ...state, isPantryAlreadyAdded: action.payload };
    }

    default:
      return state;
  }
}
