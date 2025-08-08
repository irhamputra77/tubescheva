import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange, className = "" }) {
    if (!totalPages || totalPages < 1) return null;

    const pages = [];
    const maxDisplay = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) end = Math.min(totalPages, maxDisplay);
    if (currentPage === totalPages) start = Math.max(1, totalPages - maxDisplay + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className={`flex items-center justify-center gap-1 mt-4 ${className}`}>
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded bg-[#388e3c] text-white text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400"
                aria-label="Previous page"
            >
                &lt;
            </button>

            {start > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="w-8 h-8 rounded flex items-center justify-center bg-white border text-[#388e3c] font-bold"
                    >
                        1
                    </button>
                    {start > 2 && (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">…</span>
                    )}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center font-bold ${page === currentPage ? "bg-[#388e3c] text-white" : "bg-white border text-[#388e3c]"
                        }`}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">…</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="w-8 h-8 rounded flex items-center justify-center bg-white border text-[#388e3c] font-bold"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded bg-[#388e3c] text-white text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400"
                aria-label="Next page"
            >
                &gt;
            </button>
        </div>
    );
}
