import { LockKeyhole } from "lucide-react";
import Logo from "@/shared/components/logo";
import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="p-6 flex items-center">
        <Logo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center font-sans">
        <div className="bg-white rounded-lg shadow-sm w-full max-w-sm">
          <div className="pt-6 flex items-center justify-center gap-2">
            <LockKeyhole size={18} />
            <h1 className="text-lg font-bold">Sign in</h1>
          </div>

          <div className="p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
