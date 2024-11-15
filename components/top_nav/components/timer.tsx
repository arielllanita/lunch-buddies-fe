import { Clock3 } from "lucide-react";

export default function Timer() {
  return (
    <div className="flex flex-col">
      <div className="bg-primary flex items-center justify-center space-x-1 text-white py-1 rounded-2xl">
        <Clock3 size={18} />
        <p className="text-[12px]">
          Pantry will close in: <strong>10:00:00</strong>
        </p>
      </div>
      <small className="text-[9px] italic text-white">
        Orders beyond time limit will no longer be entertained
      </small>
    </div>
  );
}
