import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { DashboardProvider } from "./_context/dashboard.context";

const Suppliers = dynamic(() => import("./_components/suppliers"), {
  loading: () => <Skeleton className="h-[40rem]" />,
  ssr: false,
});

const Pantry = dynamic(() => import("./_components/pantry"), {
  loading: () => <Skeleton className="h-[40rem]" />,
  ssr: false,
});

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-7">
      <h1 className="text-4xl">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <DashboardProvider>
          <Suppliers />
          <Pantry />
        </DashboardProvider>
      </div>
    </div>
  );
}
