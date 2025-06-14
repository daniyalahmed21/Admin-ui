import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full" />
        <div className="relative bg-white p-6 shadow-sm rounded-full">
          <ShieldAlert size={48} className="text-[#E84E40]" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Access Denied
      </h1>
      <p className="text-gray-600 max-w-xs mb-8">
        You don't have the necessary permissions to view this page. Please contact your administrator if you believe this is an error.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
        
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 font-semibold text-white bg-[#E84E40] rounded-xl hover:bg-red-600 transition-all active:scale-[0.98]"
        >
          Return Home
        </button>
      </div>

      <p className="mt-12 text-sm text-gray-400">
        Need help? <a href="#" className="underline hover:text-gray-600">Contact Support</a>
      </p>
    </div>
  );
};

export default Unauthorized;