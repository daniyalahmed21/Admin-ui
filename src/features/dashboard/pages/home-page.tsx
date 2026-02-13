import { ShoppingBag, BarChart3, Clock } from 'lucide-react';
import { StatCard } from '../components/stat-card';
import { OrderItem } from '../components/order-item';
import useAuthStore from '@/store/auth.store';

export const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning</h1>
        <p className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          {user?.firstName} {user?.lastName} <span className="text-yellow-400">😊</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats and Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              label="Total orders" 
              value="28" 
              icon={<ShoppingBag className="text-green-600" size={20} />}
              iconBg="bg-green-100"
            />
            <StatCard 
              label="Total sale" 
              value="₹ 50 000" 
              icon={<BarChart3 className="text-blue-600" size={20} />}
              iconBg="bg-blue-100"
            />
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <div className="bg-blue-100 p-1.5 rounded-lg">
                      <BarChart3 size={18} className="text-blue-600" />
                   </div>
                   <h3 className="font-bold text-gray-800">Sales</h3>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-bold">
                   <button className="px-3 py-1 rounded-md text-gray-500">W</button>
                   <button className="px-3 py-1 rounded-md bg-[#ff5a3d] text-white">M</button>
                   <button className="px-3 py-1 rounded-md text-gray-500">Y</button>
                </div>
             </div>
             {/* Placeholder for the Chart */}
             <div className="h-48 w-full bg-gray-50 rounded-lg flex items-end px-2 pb-2">
                <div className="w-full h-full border-b border-l border-gray-200 relative">
                   {/* You would use Recharts or Chart.js here */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm italic">
                      Sales Waveform Chart
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Recent Orders */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-orange-100 p-1.5 rounded-lg">
              <Clock size={18} className="text-[#ff5a3d]" />
            </div>
            <h3 className="font-bold text-gray-800">Recent orders</h3>
          </div>
          
          <div className="space-y-6 flex-grow">
            <OrderItem name="Rakesh Kohali" address="main street, bandra" price="1250" status="Preparing" statusColor="bg-red-50 text-red-400" />
            <OrderItem name="John Doe" address="side street, bandra" price="900" status="On the way" statusColor="bg-blue-50 text-blue-400" />
            <OrderItem name="Naman Kar" address="down street, bandra" price="1900" status="Delivered" statusColor="bg-green-50 text-green-400" />
            <OrderItem name="Naman Kar" address="down street, bandra" price="1900" status="Delivered" statusColor="bg-green-50 text-green-400" />
          </div>

          <button className="mt-6 text-sm font-bold text-gray-800 border-b-2 border-[#ff5a3d] w-fit">
            See all orders
          </button>
        </div>
      </div>
    </div>
  );
};