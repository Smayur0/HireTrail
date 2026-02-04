
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
          className="w-full h-12 text-base font-medium relative hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all border-zinc-200 dark:border-zinc-800" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <div className="absolute left-4">
            <svg className="h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </div>
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
