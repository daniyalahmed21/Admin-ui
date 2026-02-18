import { Outlet } from "react-router";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { MENU_ITEMS, BOTTOM_ITEMS } from "../config/navigation";

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
