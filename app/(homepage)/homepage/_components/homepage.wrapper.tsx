"use client";

import React, { useContext } from "react";
import { HomepageContext } from "../_context/homepage.context";
import DishContainer from "./dish_container";

export default function HomepageWrapper() {
  const { state, dispatch } = useContext(HomepageContext);

  const mainDish = state.menu.filter(({ dish }) => dish.type === "MAIN");
  const sideDish = state.menu.filter(({ dish }) => dish.type === "SIDE");
  const extraDish = state.menu.filter(({ dish }) => dish.type === "EXTRA");

  return (
    <div>
      {mainDish.length > 0 && (
        <div className="px-16 py-5">
          <h2 className="text-3xl font-bold">Main Dish</h2>
          <p className="text-primary mb-5">with Rice</p>

          <GridWrapper>
            {mainDish.map((menu) => (
              <DishContainer
                key={menu.id}
                menu={menu}
                onAddToCart={(note) => {
                  // dispatch({ type: "ADD_TO_CART", payload: { ...menu, orderQuantity: 1, note } });
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      dish: menu.dish,
                      id: menu.id,
                      quantity: menu.quantity,
                      orderQuantity: 1,
                      note,
                    },
                  });
                }}
              />
            ))}
          </GridWrapper>
        </div>
      )}

      {sideDish.length > 0 && (
        <div className="px-16 py-5 bg-slate-50">
          <h2 className="text-3xl font-bold">Side Dish</h2>
          <p className="text-primary mb-5">{sideDish.length} meal/s listed</p>

          <GridWrapper>
            {sideDish.map((menu) => (
              <DishContainer
                key={menu.id}
                menu={menu}
                onAddToCart={(note) => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      dish: menu.dish,
                      id: menu.id,
                      quantity: menu.quantity,
                      orderQuantity: 1,
                      note,
                    },
                  });
                }}
              />
            ))}
          </GridWrapper>
        </div>
      )}

      {extraDish.length > 0 && (
        <div className="px-16 pt-5 pb-14">
          <h2 className="text-3xl font-bold">Extra Dish</h2>
          <p className="text-primary mb-5">{extraDish.length} meal/s listed</p>

          <GridWrapper>
            {extraDish.map((menu) => (
              <DishContainer
                key={menu.id}
                menu={menu}
                onAddToCart={(note) => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      dish: menu.dish,
                      id: menu.id,
                      quantity: menu.quantity,
                      orderQuantity: 1,
                      note,
                    },
                  });
                }}
              />
            ))}
          </GridWrapper>
        </div>
      )}
    </div>
  );
}

function GridWrapper({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">{children}</div>;
}
