import { User, Lock, EyeOff, LockKeyhole, Eye } from 'lucide-react';
import { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-6 h-6 rounded-full border-[5px] border-red-500 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        </div>
        <span className="font-black text-xl text-gray-800">PIZZA</span>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-center gap-2">
          <LockKeyhole size={18} className="text-gray-800" />
          <h1 className="text-lg font-bold text-gray-800">Sign in</h1>
        </div>

        <div className="p-8 space-y-5">
          {/* Username Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="username"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 placeholder-gray-300 text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400 placeholder-gray-300 text-sm"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center gap-2 cursor-pointer text-gray-700">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-red-500" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-red-400 hover:text-red-500 transition-colors">Forgot password ?</a>
          </div>

          {/* Submit Button */}
          <button disabled={loading} className="disabled:opacity-60 disabled:cursor-not-allowed w-full bg-[#E84E40] hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all active:scale-[0.98]">
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;