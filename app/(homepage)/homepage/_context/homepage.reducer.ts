import { Order, Prisma } from "@prisma/client";
import { uniqBy } from "lodash";

export type MenuToday = Prisma.MenuGetPayload<{
  include: { _count: { select: { order: true } }; dish: { include: { supplier: true } } };
}>;

type CartType = Pick<MenuToday, "dish" | "quantity" | "id"> & { note: string; orderQuantity: number };

export type IHompageAction =
  | { type: "ADD_TO_CART" | "EDIT_CART"; payload: CartType }
  | { type: "REMOVE_TO_CART"; payload: string }
  | { type: "FETCH_MENU_TODAY"; payload: MenuToday[] };

export type IHomepageState = {
  cart: CartType[];
  orders: Order[];
  menu: Readonly<MenuToday>[];
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
      const cart = uniqBy(state.cart.concat(action.payload), "id");
      return { ...state, cart };
    }
    case "REMOVE_TO_CART": {
      const cart = state.cart.filter((menu) => menu.id !== action.payload);
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
