import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks/use-login";

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate, isPending, isError } = useLogin();

    const onSubmit = (data: LoginFormData) => {
        mutate(data, {
            onSuccess: () => onSuccess?.(),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                        <User size={18} />
                    </div>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="name@company.com"
                        autoComplete="username"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                                 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
                                 transition-all duration-200 placeholder:text-gray-400 text-sm"
                    />
                </div>
                {errors.email && (
                    <p className="text-[11px] font-medium text-red-500 ml-1">{errors.email.message}</p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                        <Lock size={18} />
                    </div>
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl
                                 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
                                 transition-all duration-200 placeholder:text-gray-400 text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 
                                 hover:text-gray-600 transition-colors rounded-md"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-[11px] font-medium text-red-500 ml-1">{errors.password.message}</p>
                )}
            </div>

            <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500 cursor-pointer accent-red-500" 
                    />
                    <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">
                    Forgot password?
                </a>
            </div>

            {/* API Error Message */}
            {isError && (
                <div className="bg-red-50 border border-red-100 p-3 rounded-lg">
                    <p className="text-xs text-red-600 text-center font-medium">
                        Invalid email or password. Please try again.
                    </p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#E84E40] hover:bg-red-600 text-white
                         font-bold py-3 rounded-xl
                         transition-all duration-200 active:scale-[0.98]
                         disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 mt-2"
            >
                {isPending ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Verifying...</span>
                    </>
                ) : (
                    "Sign In"
                )}
            </button>
        </form>
    );
};

export default LoginForm;