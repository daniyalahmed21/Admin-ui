import { NavLink } from 'react-router';
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
      end={path === '/dashboard'} 
      className={({ isActive }) => `
        w-full flex items-center px-6 py-2 text-md border-l-4 transition-all duration-200
        ${isActive 
          ? 'text-[#ff5a3d] bg-orange-50 border-[#ff5a3d] font-semibold' 
          : 'text-gray-500 border-transparent hover:text-[#ff5a3d] hover:bg-orange-50 font-medium'
        }
      `}
    >
      <Icon size={18} className="mr-2 shrink-0 transition-transform group-hover:scale-105" />
      <span>{label}</span>
    </NavLink>
  );
};


export default NavItem;
