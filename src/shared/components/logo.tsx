
const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-[6px] border-red-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
            </div>
            <span className="font-black text-2xl text-gray-800">PIZZA</span>
        </div>
    )
}

export default Logo