import { getOrders } from "@/actions/order.actions";
import { Order, Prisma } from "@prisma/client";
import { sumBy, uniqBy } from "lodash";

export type MenuToday = Prisma.MenuGetPayload<{
  include: {
    _count: { select: { order: true } };
    dish: { include: { supplier: true } };
    order: true;
  };
}> & { totalOrder: number };

type CartType = Pick<MenuToday, "dish" | "quantity" | "id"> & {
  note: string;
  orderQuantity: number;
};

export type UserOrderType = Awaited<ReturnType<typeof getOrders>>;

export type IHompageAction =
  | { type: "ADD_TO_CART" | "EDIT_CART"; payload: CartType }
  | { type: "REMOVE_TO_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "FETCH_MENU_TODAY"; payload: MenuToday[] }
  | { type: "FETCH_USER_ORDER"; payload: UserOrderType };

export type IHomepageState = {
  cart: CartType[];
  orders: Readonly<UserOrderType>;
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
      const cart = state.cart.map((menu) => {
        return menu.id === id ? action.payload : menu;
      });

      return { ...state, cart };
    }
    case "FETCH_MENU_TODAY": {
      return { ...state, menu: action.payload };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "FETCH_USER_ORDER": {
      return { ...state, orders: action.payload };
    }

    default:
      return state;
  }
}
