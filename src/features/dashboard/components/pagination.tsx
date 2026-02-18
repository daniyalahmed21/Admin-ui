import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="p-6 flex justify-end items-center gap-2">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                    pageNum = i + 1;
                } else if (currentPage <= 3) {
                    pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                } else {
                    pageNum = currentPage - 2 + i;
                }

                return (
                    <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center border rounded-lg text-sm font-bold ${currentPage === pageNum
                                ? "border-[#ff5a3d] text-[#ff5a3d]"
                                : "border-gray-200 text-gray-400 hover:bg-gray-50"
                            }`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
