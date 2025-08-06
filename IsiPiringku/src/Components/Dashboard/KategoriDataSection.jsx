import React, { useState } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    const maxDisplay = 3;
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) end = Math.min(totalPages, maxDisplay);
    if (currentPage === totalPages) start = Math.max(1, totalPages - maxDisplay + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

return (
    <div className="flex items-center justify-center gap-1 mt-4">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded bg-[#388e3c] text-white text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400"
        >&lt;</button>

        {start > 1 && (
            <>
                <button onClick={() => onPageChange(1)} className="w-8 h-8 rounded flex items-center justify-center bg-white border text-[#388e3c] font-bold">1</button>
                {start > 2 && <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">...</span>}
            </>
        )}

        {pages.map((page) => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded flex items-center justify-center font-bold ${page === currentPage ? "bg-[#388e3c] text-white" : "bg-white border text-[#388e3c]"}`}
            >
                {page}
            </button>
        ))}

        {end < totalPages && (
            <>
                {end < totalPages - 1 && <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">...</span>}
                <button onClick={() => onPageChange(totalPages)} className="w-8 h-8 rounded flex items-center justify-center bg-white border text-[#388e3c] font-bold">{totalPages}</button>
            </>
        )}

        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded bg-[#388e3c] text-white text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400"
        >&gt;</button>
    </div>
);
}

export default function ArtikelTableOnly() {
const rows = [
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "POST" },
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "PENDING" },
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "POST" },
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "CANCEL" },
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "PENDING" },
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "CANCEL" },
    { judul: "Nutrisi, Pengertian dan jenis - jenisnya yang perlu diketahui", deskripsi: "Nutrisi adalah aspek fundamental bagi kesehatan dan perkembangan ....", tanggal: "08/10/2029", status: "PENDING" }
];

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;
const totalPages = Math.ceil(rows.length / itemsPerPage);
const displayedRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
const emptyRows = itemsPerPage - displayedRows.length;

function getStatusStyle(status) {
    if (status === "POST") return "bg-[#CFF5D1] text-[#39833C] border-[#7BE495]";
    if (status === "PENDING") return "bg-[#F7F7BB] text-[#B68B13] border-[#E5DE61]";
    if (status === "CANCEL") return "bg-[#FFD9D9] text-[#C23C3C] border-[#EBA3A3]";
    return "";
}

return (
    <div className="mx-4 my-6">
    <div className="flex items-center justify-between mb-3 px-2"> {/* ✨ */}
            <h2 className="text-xl font-bold text-[#222]">KATEGORI ARTIKEL</h2> {/* ✨ */}
            <button className="w-12 h-12 bg-[#4CAF50]/20 text-[#39833C] text-5xl leading-none rounded-full font-medium flex items-center justify-center"> {/* ✨ */}
                <span className="relative -top-[4px]">+</span>
            </button>
        </div>

        <div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
            <div className="grid grid-cols-7 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
                <div className="py-3 px-3 rounded-l-xl text-center">NO</div>
                <div className="py-3 px-3 text-center">JUDUL</div>
                <div className="py-3 px-3 text-center">DESKRIPSI</div>
                <div className="py-3 px-3 text-center">TANGGAL</div>
                <div className="py-3 px-3 text-center">STATUS</div>
                <div className="py-3 px-3 text-center rounded-r-xl col-span-2">ACTION</div>
            </div>
            <div className="divide-y">
                {displayedRows.map((row, i) => (
                    <div key={i} className="grid grid-cols-7 items-center bg-white text-[#222] text-sm">
                        <div className="py-5 px-3 text-center">{(currentPage - 1) * itemsPerPage + i + 1}</div>
                        <div className="py-5 px-3">{row.judul}</div>
                        <div className="py-5 px-3">{row.deskripsi}</div>
                        <div className="py-5 px-3 text-center font-bold">{row.tanggal}</div>
                        <div className="py-5 px-3 flex justify-center">
                            <span className={`px-5 py-1 rounded-lg font-semibold text-sm border ${getStatusStyle(row.status)}`}>{row.status}</span>
                        </div>
                        <div className="py-5 px-3 flex gap-2 justify-center col-span-2">
                            <button className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs">EDIT</button>
                            <button className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs">HAPUS</button>
                        </div>
                    </div>
                ))}
                {Array.from({ length: emptyRows }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="grid grid-cols-7 bg-white text-[#222] text-sm" style={{ minHeight: '84px' }}>
                        {Array.from({ length: 7 }).map((__, colIdx) => (
                            <div key={colIdx} className="py-5 px-3">&nbsp;</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
);
}
