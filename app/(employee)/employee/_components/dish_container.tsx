import { MenuToday } from "../page";

export default function DishContainer({ menu }: { menu: MenuToday }) {
  return <div className="rounded">{menu.dish.name}</div>;
}
