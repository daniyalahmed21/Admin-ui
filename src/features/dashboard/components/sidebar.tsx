import { NavLink } from 'react-router';
import Logo from '@/shared/components/logo';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  item: {
    label: string;
    icon: LucideIcon;
    path: string;
  };
}

const NavItem = ({ item }: NavItemProps) => {
  const { icon: Icon, label, path } = item;

  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
        w-full flex items-center px-6 py-3 text-sm transition-all duration-200 border-l-4 group
        ${isActive 
          ? 'text-[#ff5a3d] bg-orange-50 border-[#ff5a3d] font-bold' 
          : 'text-gray-500 border-transparent hover:text-[#ff5a3d] hover:bg-orange-50 font-medium'
        }
      `}
    >
      {({ isActive }) => (
        <>
          <Icon 
            size={20} 
            strokeWidth={isActive ? 2.5 : 2} 
            className="mr-3 shrink-0 transition-transform group-hover:scale-110" 
          />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
};

interface SidebarProps {
  topItems: any[];
  bottomItems: any[];
}

const Sidebar = ({ topItems, bottomItems }: SidebarProps) => {
  return (
    <aside className="flex flex-col w-50 h-screen bg-white border-r border-gray-100 py-6 sticky top-0">
      <div className="flex items-center px-6 mb-5 gap-3">
        <Logo />
      </div>

      <nav className="flex-grow space-y-1">
        {topItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      <div className="mt-auto space-y-1">
        <div className="h-px bg-gray-100 mx-6 mb-4" />
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;