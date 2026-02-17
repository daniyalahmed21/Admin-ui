export const OrderItem = ({ name, address, price, status, statusColor }: any) => (
  <div className="flex justify-between items-start">
    <div>
      <p className="text-sm font-bold text-gray-900">{name}</p>
      <p className="text-xs text-gray-400">{address}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-gray-900 mb-1">$ {price}</p>
      <span className={`${statusColor} text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap`}>
        {status}
      </span>
    </div>
  </div>
);