import { Order, Menu, Prisma } from "@prisma/client";

export type MenuToday = Prisma.MenuGetPayload<{
  include: { _count: { select: { order: true } }; dish: { include: { supplier: true } } };
}>;

export type IHompageAction =
  | { type: "ADD_TO_CART" | "EDIT_CART"; payload: Order }
  | { type: "REMOVE_TO_CART"; payload: string }
  | { type: "FETCH_MENU_TODAY"; payload: MenuToday[] };

export type IHomepageState = {
  cart: Order[];
  orders: Order[];
  menu: MenuToday[];
  isMainDishInCart: boolean;
  isSideDishInCart: boolean;
};

export const initState: IHomepageState = {
  cart: [],
  orders: [],
  menu: [],
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
    case "FETCH_MENU_TODAY": {
      return { ...state, menu: action.payload };
    }

    default:
      return state;
  }
}
