import { Link } from "react-router-dom";
import ThemeSwitch from "../ui/theme-switcher";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 transition-all hover:opacity-80">
             <div className="size-9 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 font-bold text-lg">
                H
             </div>
            <span className="hidden sm:inline-block font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                HireTrail
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="hidden sm:flex h-9 px-5 border-gray-200 dark:border-gray-800 text-sm font-medium hover:scale-105 transition-all duration-300 dark:bg-gray-900"
          >
            <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
