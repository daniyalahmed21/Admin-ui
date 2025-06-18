import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User } from "lucide-react";
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
            onSuccess: () => {
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username / Email */}
            <div>
                <div className="relative">
                    <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="email"
                        autoComplete="username"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-red-400
                     placeholder-gray-300 text-sm"
                    />

                </div>
                {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>


            {/* Password */}
            <div>
                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        autoComplete="current-password"
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md
                     focus:outline-none focus:ring-1 focus:ring-red-400
                     placeholder-gray-300 text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-red-500" />
                    <span>Remember me</span>
                </label>
                <a href="#" className="text-red-400 hover:text-red-500 transition-colors">Forgot password ?</a>
            </div>

            {/* API Error */}
            {isError && (
                <p className="text-xs text-red-500 text-center">
                    Invalid email or password
                </p>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#E84E40] hover:bg-red-600 text-white
                   font-semibold py-2.5 rounded-lg shadow-md
                   transition-all active:scale-[0.98]
                   disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? "Signing in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;
