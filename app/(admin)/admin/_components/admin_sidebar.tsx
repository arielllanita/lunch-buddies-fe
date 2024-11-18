import { Archive, FileText, Home, Sandwich, ShoppingCart, User, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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
    url: "/admin/week-report",
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
    <Sidebar className="">
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
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
