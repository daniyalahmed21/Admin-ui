import { Bell, ChevronDown, MapPin, LogOut } from 'lucide-react';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { useState } from 'react';
import useAuthStore from '@/store/auth.store';

const Header = () => {
    const { user } = useAuthStore();
    const { mutate: logout, isPending } = useLogout();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="h-16 w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">

            {/* Location Badge */}
            <div className="bg-orange-50 px-4 py-2 rounded-full flex items-center gap-2">
                <MapPin size={20} className="text-[#ff5a3d]" />
                <span className="text-[#ff5a3d] text-sm font-semibold">
                    {user?.role === "admin" ? "Global" : user?.role}
                </span>
            </div>

            {/* Actions & Profile */}
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                </button>

                <div className="relative">
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <img
                                src={"/public/images.png"}
                                alt="User profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <ChevronDown size={16} className={`text-gray-400 group-hover:text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-20">
                            <button
                                onClick={() => logout()}
                                disabled={isPending}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors disabled:opacity-50"
                            >
                                <LogOut size={16} />
                                {isPending ? 'Logging out...' : 'Sign out'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;