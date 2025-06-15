import { Loader2 } from "lucide-react";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50">
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl animate-pulse" />
                
                <Loader2 
                    className="animate-spin text-[#E84E40] relative z-10" 
                    size={42} 
                    strokeWidth={2.5}
                />
            </div>
            
            <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">
                Loading...
            </p>
        </div>
    );
};

export default Loader;