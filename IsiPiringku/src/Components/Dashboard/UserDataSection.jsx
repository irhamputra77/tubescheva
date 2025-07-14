import React, { useState } from "react";

// Komponen Pagination tetap sama
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
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">...</span>
                    )}
                </>
            )}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center font-bold ${page === currentPage
                        ? "bg-[#388e3c] text-white"
                        : "bg-white border text-[#388e3c]"
                        }`}
                >
                    {page}
                </button>
            ))}
            {end < totalPages && (
                <>
                    {end < totalPages - 1 && (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">...</span>
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
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded bg-[#388e3c] text-white text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400"
            >
                &gt;
            </button>
        </div>
    );
}

// UserDataSection dengan grid dan padding baris kosong
export default function UserDataSection() {
    const users = [
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        // Coba hapus/kurangi jumlah data di sini, baris kosong otomatis muncul di UI
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
    const totalPages = Math.ceil(users.length / usersPerPage);

    const displayedUsers = users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    // Hitung sisa baris kosong
    const emptyRows = usersPerPage - displayedUsers.length;

    return (
        <div className="mx-4 my-6">
            <div className="text-xl font-bold mb-3 text-[#222] pl-2">DATA PENGGUNA</div>
            <div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
                {/* Header grid */}
                <div className="grid grid-cols-6 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
                    <div className="text-center py-3 px-3 rounded-l-xl">NO</div>
                    <div className="text-center py-3 px-3">NAMA LENGKAP</div>
                    <div className="text-center py-3 px-3">TANGGAL LAHIR</div>
                    <div className="text-center py-3 px-3">EMAIL</div>
                    <div className="text-center py-3 px-3">JENIS KELAMIN</div>
                    <div className="text-center py-3 px-3 rounded-r-xl text-center">ACTION</div>
                </div>
                {/* Body grid */}
                <div className="divide-y">
                    {displayedUsers.map((user, i) => (
                        <div key={i} className="grid grid-cols-6 items-center bg-white text-[#222] text-sm">
                            <div className="py-5 px-3 text-center">{(currentPage - 1) * usersPerPage + i + 1}</div>
                            <div className="py-5 px-3 text-center">{user.nama}</div>
                            <div className="py-5 px-3 text-center">{user.tgl}</div>
                            <div className="py-5 px-3 text-center">{user.email}</div>
                            <div className="py-5 px-3 text-center">{user.jk}</div>
                            <div className="py-5 px-3 flex gap-2 justify-center">
                                <button className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs">EDIT</button>
                                <button className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs">HAPUS</button>
                            </div>
                        </div>
                    ))}
                    {/* Baris kosong */}
                    {Array.from({ length: emptyRows }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="grid grid-cols-6 items-center bg-white text-[#222] text-sm" style={{ minHeight: '56px' }}>
                            {Array.from({ length: 6 }).map((__, colIdx) => (
                                <div key={colIdx} className="py-5 px-3">&nbsp;</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
