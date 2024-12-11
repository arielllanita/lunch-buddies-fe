import { Order, Menu } from "@prisma/client";

export type IHompageAction =
  | { type: "ADD_TO_CART" | "EDIT_CART"; payload: Order }
  | { type: "REMOVE_TO_CART"; payload: string }
  | { type: "ADD_MENU"; payload: Menu[] };

export type IHomepageState = {
  cart: Order[];
  menus: Menu[];
  isMainDishInCart: boolean;
  isSideDishInCart: boolean;
};

export const initState: IHomepageState = {
  cart: [],
  menus: [],
  isMainDishInCart: false,
  isSideDishInCart: false,
};

export function reducer(state: IHomepageState, action: IHompageAction): IHomepageState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const cart = state.cart.concat(action.payload);
      return { ...state, cart };
    }
    case "REMOVE_TO_CART": {
      const cart = state.cart.filter((c) => c.id !== action.payload);
      return { ...state, cart };
    }
    case "EDIT_CART": {
      const { id } = action.payload;
      const cart = state.cart.map((c) => (c.id === id ? action.payload : c));
      return { ...state, cart };
    }

    default:
      return state;
  }
}
