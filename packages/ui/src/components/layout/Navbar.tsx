import { Link, useLocation } from "react-router-dom";
import ThemeSwitch from "../ui/theme-switcher";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogIn, Rocket } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // const navLinks = [
  //   { name: "Home", path: "/", icon: Rocket },
  //   { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
  // ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
             <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                H
             </div>
            <span className="hidden sm:inline-block">HireTrail</span>
          </Link>
        </div>

        {/* <div className="flex items-center gap-6">
            {navLinks.map((link) => (
                <Link
                key={link.path}
                to={link.path}
                className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                )}
                >
                <link.icon className="h-4 w-4" />
                <span className="hidden sm:inline-block">{link.name}</span>
                </Link>
            ))}
        </div> */}

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Button variant="default" size="sm" asChild>
            <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
