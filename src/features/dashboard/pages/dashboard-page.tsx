import { Outlet } from "react-router";
import Sidebar from "../components/sidebar";
import { BarChart2, Gift, HelpCircle, Home, Package, Settings, ShoppingBag, Users } from "lucide-react";
import Header from "../components/header";

export const MENU_ITEMS = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Orders', icon: ShoppingBag, path: '/dashboard/orders' },
  { label: 'Products', icon: Package, path: '/dashboard/products' },
  { label: 'Users', icon: Users, path: '/dashboard/users' },
  { label: 'Sales', icon: BarChart2, path: '/dashboard/sales' },
  { label: 'Promo', icon: Gift, path: '/dashboard/promo' },
];

export const BOTTOM_ITEMS = [
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Help', icon: HelpCircle, path: '/help' },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar topItems={MENU_ITEMS} bottomItems={BOTTOM_ITEMS} />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
