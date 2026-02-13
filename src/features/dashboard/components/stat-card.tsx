export const StatCard = ({ label, value, icon, iconBg }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
    <div className={`${iconBg} p-3 rounded-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

