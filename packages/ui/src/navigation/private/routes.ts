import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";

interface AuthRoute {
  path: string;
  //   access: string[];
  description: string;
  Element: ReactElement;
  //   isShowOnSidebar: boolean;
  icon?: LucideIcon | boolean;
  title: string;
}

export const AuthRoutes: AuthRoute[] = [
  {
    path: "/dashboard",
    // access: [ROLE_NAMES.SUPER_ADMIN],
    description: "This is for dashboard",
    Element: <Dashboard />,
    // isShowOnSidebar: true,
    icon: GaugeIcon,
    title: "Dashboard",
  },
];
