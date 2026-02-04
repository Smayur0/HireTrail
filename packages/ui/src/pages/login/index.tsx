
import { LoginForm } from "./components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleForgotPassword = () => {
    // Handle forgot password
  };

  return (
    <div className="bg-background relative flex h-full items-center justify-center px-4 py-4 sm:px-6 md:py-4 lg:px-8 lg:py-12">
      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-xl bg-white shadow-xl md:rounded-2xl md:shadow-2xl lg:flex lg:max-h-[550px]">
          {/* Branding Section */}
          <div className="hidden items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 lg:flex lg:w-1/2">
            <div className="max-w-sm space-y-4 text-white">
              <h1 className="text-3xl font-bold tracking-tight">HireTrail</h1>
            </div>
          </div>

          {/* Login Section */}
          <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 md:px-8 md:py-6 lg:px-12 lg:py-24">
            <div className="w-full max-w-md">
              <Card className="border-0 bg-transparent shadow-none">
                <CardHeader className="pb-4 text-center md:pb-0">
                  <CardTitle className="text-xl font-bold text-gray-900 md:text-2xl">
                    Welcome back to HireTrail
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 md:text-base">
                    Sign in to your account to continue
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <LoginForm
                    onSubmit={handleSubmit}
                    onForgotPassword={handleForgotPassword}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
