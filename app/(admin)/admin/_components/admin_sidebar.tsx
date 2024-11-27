import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Archive, FileText, Home, Sandwich, ShoppingCart, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Add Supplier",
    url: "/admin/add-supplier",
    icon: User,
  },
  {
    title: "Add Dish",
    url: "/admin/add-dish",
    icon: Sandwich,
  },
  {
    title: "Order Summary",
    url: "/admin/order-summary",
    icon: ShoppingCart,
  },
  {
    title: "Weekly Report",
    url: "/admin/weekly-report",
    icon: FileText,
  },
  {
    title: "User Management",
    url: "/admin/user-management",
    icon: Users,
  },
  {
    title: "Archive",
    url: "/admin/archive",
    icon: Archive,
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} asChild>
              <Link href={"#"}>
                <Image src={"/images/logo-lunch-buddies.png"} width={200} height={50} alt="Logo" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="text-white p-7">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
