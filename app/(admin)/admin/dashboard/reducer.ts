import { IDishType } from "@/services/dish.service";
import { ISupplier } from "@/services/supplier.service";
import { uniqBy } from "lodash";

export type IDashboardState = {
  dishes: IDishType[];
  suppliers: ISupplier[];
  pantry: (IDishType & { dish_availability: number })[];
  isPantryAlreadyAdded: boolean;
  triggerFetch: number;
};

export type IDashboardAction = {
  type:
    | "ADD_DISH"
    | "ADD_TO_PANTRY"
    | "EDIT_PANTRY"
    | "REMOVE_FROM_PANTRY"
    | "CLEAR_PANTRY"
    | "ADD_SUPPLIER"
    | "FILTER_DISH_BY_NAME"
    | "REFETCH_DISHES"
    | "IS_PANTRY_CLOSE";
  payload?: any;
};

export const initState: IDashboardState = {
  dishes: [],
  suppliers: [],
  pantry: [],
  isPantryAlreadyAdded: false,
  triggerFetch: 0,
};

export function reducer(state: IDashboardState, action: IDashboardAction) {
  switch (action.type) {
    case "ADD_DISH": {
      // const dishes = uniqBy(state.dishes.concat(action.payload), "id");
      return { ...state, dishes: action.payload };
    }
    case "ADD_SUPPLIER": {
      const suppliers = uniqBy(state.suppliers.concat(action.payload), "id");
      return { ...state, suppliers };
    }
    case "ADD_TO_PANTRY": {
      const pantry = uniqBy(state.pantry.concat(action.payload), "id");
      
      // console.log('up', action.payload);
      // const pantry = uniqBy(action.payload, "id");
      // console.log('down', pantry);
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
    case "FILTER_DISH_BY_NAME": {
      const dishes = state.dishes.filter((d) =>
        d.dish_id.dish_name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, dishes };
    }
    case "REFETCH_DISHES": {
      return { ...state, triggerFetch: state.triggerFetch + 1 };
    }
    case "IS_PANTRY_CLOSE": {
      return { ...state, isPantryAlreadyAdded: action.payload };
    }

    default:
      return state;
  }
}
