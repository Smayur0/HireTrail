
import { LoginForm } from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto grid w-[350px] gap-6">
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:flex h-full flex-col items-center justify-center p-10 bg-zinc-900 text-white">
          <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                <span className="text-3xl font-bold">H</span>
             </div>
             <h1 className="text-4xl font-bold tracking-tight">HireTrail</h1>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
