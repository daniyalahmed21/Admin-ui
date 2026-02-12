export const StatCard = ({ label, value, icon, iconBg }: any) => (
  <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center gap-3">
    <div className={`${iconBg} p-2.5 rounded-lg flex items-center justify-center`}>
      {icon}
    </div>

    <div className="space-y-0.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p className="text-xl font-bold text-gray-900 leading-snug tabular-nums">
        {value}
      </p>
    </div>
  </div>
);
