import Logo from '@/shared/components/logo';
import NavItem from './nav-item';

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