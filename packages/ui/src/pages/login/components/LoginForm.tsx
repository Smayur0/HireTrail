
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/config";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onSubmit?: (e: React.FormEvent) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
}

export function LoginForm({
  className,
  onSubmit,
  onForgotPassword,
  isLoading = false,
  ...props
}: LoginFormProps) {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <Button 
          variant="outline" 
          className="w-full mt-2 h-12 text-base font-medium relative hover:scale-105 dark:hover:bg-zinc-900 transition ease-in-out duration-300 dark:bg-zinc-800 transition-all border-zinc-200 dark:border-zinc-800"  
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Login with Google
        </Button>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
