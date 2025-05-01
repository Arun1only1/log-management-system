import {
  IconChartBar,
  IconDashboard,
  IconListDetails,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";

const data: {
  navMain: Array<{
    title: string;
    url: string;
    icon: React.ReactNode;
    source: "all" | "nginx" | "apache";
    requiredRoles: string[];
  }>;
} = {
  navMain: [
    {
      title: "All logs",
      url: "/",
      icon: <IconDashboard />,
      source: "all",
      requiredRoles: ["admin"],
    },
    {
      title: "Nginx",
      url: "/nginx",
      icon: <IconListDetails />,
      source: "nginx",
      requiredRoles: ["admin", "nginx"],
    },
    {
      title: "Apache",
      url: "/apache",
      icon: <IconChartBar />,
      source: "apache",
      requiredRoles: ["admin", "apache"],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { firstName, lastName, email } = useAppSelector((state) => state.auth);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="pl-4 font-semibold"> Dashboard</div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser firstName={firstName} lastName={lastName} email={email} />
      </SidebarFooter>
    </Sidebar>
  );
}
