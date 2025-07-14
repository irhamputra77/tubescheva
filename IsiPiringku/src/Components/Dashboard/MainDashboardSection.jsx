import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
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
                        : "bg-white border text-[#388e3c]"}`}
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

const data = [
    { name: 'Januari', value: 100 },
    { name: 'Februari', value: 300 },
    { name: 'Maret', value: 800 },
    { name: 'April', value: 600 },
    { name: 'Mei', value: 900 },
    { name: 'Juni', value: 1200 },
    { name: 'Juli', value: 1800 },
];

export default function MainDashboardSection() {
    const users = [
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
        { nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const totalPages = Math.ceil(users.length / usersPerPage);

    const displayedUsers = users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <div className="w-full max-h-[80vh] bg-[#F5F5F5] pt-14 overflow-hidden ">
            <div className="max-w-screen-2xl mx-auto w-full px-2 sm:px-4 h-auto">
                <div className="grid grid-cols-1 md:grid-cols-8 grid-rows-8 gap-5 w-full min-h-[4px]">
                    <div className="md:col-span-2 row-span-2 bg-white rounded-xl shadow px-7 py-4 flex flex-col">
                        <div className="text-[#388E3C] font-semibold text-xl mb-2">Ibu dengan Bayi</div>
                        <div className="text-[#388E3C] font-bold text-4xl mb-1">1,954</div>
                        <div className="w-full h-[2px] bg-[#eeeeee] my-2"></div>
                        <div className="flex items-center gap-2 mt-2">
                            <svg width="28" height="28" viewBox="0 0 48 48" fill="#388E3C">
                            </svg>
                            <span className="text-[#388E3C] text-base font-semibold">00% dari bulan lalu</span>
                        </div>
                    </div>
                    <div className="md:col-span-6 row-span-2 bg-white rounded-xl shadow px-4 py-3 flex items-center min-h-[148px]">
                        <ResponsiveContainer width="100%" height={120}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7fe57e" stopOpacity={0.7} />
                                        <stop offset="100%" stopColor="#C8E6C9" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#6b6b6b" }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#7fe57e"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    dot={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-span-1 md:col-span-8 row-start-3 row-end-8 bg-white rounded-xl shadow px-2 md:px-4 py-2 mt-1">
                        <div className="text-2xl font-bold text-[#252525] mb-4">PENGGUNA BARU</div>
                        <div className="w-full overflow-auto" style={{ maxHeight: "350px" }}>
                            <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                    <tr className="bg-[#EEEEEE] text-[#222]">
                                        <th className="py-5 px-3 text-sm font-medium rounded-l-xl">NO</th>
                                        <th className="py-5 px-3 text-sm font-medium">NAMA LENGKAP</th>
                                        <th className="py-5 px-3 text-sm font-medium">TANGGAL LAHIR</th>
                                        <th className="py-5 px-3 text-sm font-medium">EMAIL</th>
                                        <th className="py-5 px-3 text-sm font-medium">JENIS KELAMIN</th>
                                        <th className="py-5 px-3 text-sm font-medium rounded-r-xl">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedUsers.map((user, i) => (
                                        <tr key={i} className="bg-white border-b last:border-none">
                                            <td className="py-3 px-3 text-center">{(currentPage - 1) * usersPerPage + i + 1}</td>
                                            <td className="py-3 px-3">{user.nama}</td>
                                            <td className="py-3 px-3">{user.tgl}</td>
                                            <td className="py-3 px-3">{user.email}</td>
                                            <td className="py-3 px-3">{user.jk}</td>
                                            <td className="py-3 px-3 flex gap-2">
                                                <button className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-3 py-1 text-xs font-bold">EDIT</button>
                                                <button className="bg-[#A83A3A] text-white rounded-md px-3 py-1 text-xs font-bold">HAPUS</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
