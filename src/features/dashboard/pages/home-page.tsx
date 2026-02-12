import { ShoppingBag, BarChart3, Clock } from 'lucide-react';
import { StatCard } from '../components/stat-card';
import { OrderItem } from '../components/order-item';
import useAuthStore from '@/store/auth.store';

export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-0.5">
        <h1 className="text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
          Good morning
        </h1>
        <p className="text-2xl font-bold text-gray-900 flex items-center gap-1.5 leading-snug">
          {user?.firstName} {user?.lastName}
          <span className="text-yellow-400 text-xl">😊</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              label="Total orders"
              value="28"
              icon={<ShoppingBag className="text-green-600" size={18} />}
              iconBg="bg-green-100"
            />
            <StatCard
              label="Total sale"
              value="$ 50,000"
              icon={<BarChart3 className="text-blue-600" size={18} />}
              iconBg="bg-blue-100"
            />
          </div>

          {/* Sales Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 ">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded-lg">
                  <BarChart3 size={16} className="text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
                  Sales overview
                </h3>
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg text-[10px] font-semibold">
                <button className="px-2 py-0.5 rounded-md text-gray-500 hover:text-gray-700">
                  W
                </button>
                <button className="px-2 py-0.5 rounded-md bg-[#ff5a3d] text-white">
                  M
                </button>
                <button className="px-2 py-0.5 rounded-md text-gray-500 hover:text-gray-700">
                  Y
                </button>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-40 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
              <span className="text-sm text-gray-400 italic">
                Sales Waveform Chart
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="bg-orange-100 p-1.5 rounded-lg">
              <Clock size={16} className="text-[#ff5a3d]" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
              Recent orders
            </h3>
          </div>

          <div className="space-y-4 flex-grow">
            <OrderItem
              name="Frank Andrew"
              address="Main street, New York"
              price="1250"
              status="Preparing"
              statusColor="bg-red-50 text-red-400"
            />
            <OrderItem
              name="Garry khalil"
              address="Side street, New York"
              price="900"
              status="On the way"
              statusColor="bg-blue-50 text-blue-400"
            />
            <OrderItem
              name="Kamal khan"
              address="Down street, New York"
              price="1900"
              status="Delivered"
              statusColor="bg-green-50 text-green-400"
            />
          </div>

          <button className="mt-6 text-[11px] font-semibold text-gray-800 border-b-2 border-[#ff5a3d] w-fit tracking-wide">
            See all orders
          </button>
        </div>
      </div>
    </div>
  );
};
