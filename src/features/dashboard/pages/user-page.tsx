import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const UsersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs font-medium text-gray-400 flex gap-2">
        <span>Dashboard</span>
        <span>&gt;</span>
        <span className="text-gray-600">Users</span>
      </nav>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-grow max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
        </div>
        
        <select className="bg-gray-50 border-none rounded-lg text-sm px-4 py-2 text-gray-500 outline-none cursor-pointer">
          <option>Status</option>
        </select>

        <select className="bg-gray-50 border-none rounded-lg text-sm px-4 py-2 text-gray-500 outline-none cursor-pointer">
          <option>Role</option>
        </select>

        <button 
          onClick={() => navigate('/dashboard/users/create')}
          className="ml-auto bg-[#ff5a3d] hover:bg-[#e54e35] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Create users
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider font-bold">
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <UserRow 
              name="Rakesh K" 
              email="rakesh@example.com" 
              role="Admin" 
              status="active" 
              date="25 July 2022" 
              statusColor="bg-green-50 text-green-500" 
            />
            <UserRow 
              name="Ashwini K" 
              email="ashwini@example.com" 
              role="Customer" 
              status="banned" 
              date="25 July 2022" 
              statusColor="bg-red-50 text-red-400" 
            />
            <UserRow 
              name="Jane Doe" 
              email="janedoe@example.com" 
              role="Employee" 
              status="valid" 
              date="25 July 2022" 
              statusColor="bg-green-50 text-green-500" 
            />
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-6 flex justify-end items-center gap-2">
           <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50"><ChevronLeft size={16}/></button>
           <button className="w-8 h-8 flex items-center justify-center border border-[#ff5a3d] text-[#ff5a3d] rounded-lg text-sm font-bold">1</button>
           {[2, 3, 4, 5].map(n => (
             <button key={n} className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg text-sm hover:bg-gray-50">{n}</button>
           ))}
           <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
};

const UserRow = ({ name, email, role, status, date, statusColor }: any) => (
  <tr className="hover:bg-gray-50/50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <img src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 50)}`} alt={name} />
        </div>
        <span className="text-sm font-bold text-gray-800">{name}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`${statusColor} px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{role}</td>
    <td className="px-6 py-4 text-sm text-gray-500">{email}</td>
    <td className="px-6 py-4 text-sm text-gray-500">{date}</td>
  </tr>
);

export default UsersPage;