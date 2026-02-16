import { Bell, ChevronDown, MapPin } from 'lucide-react';

const Header = ({ location = "Global"}: { location?: string }) => {
  return (
    <header className="h-16 w-full bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      
      {/* Location Badge */}
      <div className="bg-orange-50 px-4 py-2 rounded-full flex items-center gap-2">
        <MapPin size={20} className="text-[#ff5a3d]" />
        <span className="text-[#ff5a3d] text-sm font-semibold">
          {location}
        </span>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img 
              src="https://avatar.iran.liara.run/public/30" 
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Header;