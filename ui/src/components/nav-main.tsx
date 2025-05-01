import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDashboardQueryParams } from "@/hooks/query-params/use-dashboard-query-params";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { useLocation, useNavigate } from "react-router";

interface Props {
  items: Array<{
    title: string;
    url: string;
    icon: React.ReactNode;
    source: "all" | "nginx" | "apache";
    requiredRoles: string[];
  }>;
}
export function NavMain({ items }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { role } = useAppSelector((state) => state.auth);
  const { setSource } = useDashboardQueryParams();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url) &&
                  (pathname === item.url ||
                    pathname[item.url.length] === "/" ||
                    pathname[item.url.length] === undefined);

            const showNavItem = item.requiredRoles.includes(role);

            return (
              <>
                {showNavItem && (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "cursor-pointer",
                        isActive ? "bg-purple-300 hover:bg-purple-200" : ""
                      )}
                      onClick={() => {
                        navigate(item.url);
                        setSource(item.source);
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
