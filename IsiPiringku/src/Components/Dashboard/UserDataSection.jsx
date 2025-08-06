import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Pagination({ currentPage, totalPages, onPageChange }) {
	const pages = [];
	const maxDisplay = 3;
	let start = Math.max(1, currentPage - 1);
	let end = Math.min(totalPages, currentPage + 1);

	if (currentPage === 1) end = Math.min(totalPages, maxDisplay);
	if (currentPage === totalPages)
		start = Math.max(1, totalPages - maxDisplay + 1);

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
						<span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
							
						</span>
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
						<span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">
							...
						</span>
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

export default function UserDataSection() {
	const navigate = useNavigate();


	const users = [
		{ id: 1, nama: "ADI SULAIMAN", tgl: "08/10/2012", email: "ADI@GMAIL.COM", jk: "LAKI - LAKI" },
		{ id: 2, nama: "BUDI MULYANA", tgl: "10/12/2010", email: "BUDI@GMAIL.COM", jk: "LAKI - LAKI" },
		{ id: 3, nama: "BUDI MULYANA", tgl: "10/12/2010", email: "BUDI@GMAIL.COM", jk: "LAKI - LAKI" },
		{ id: 4, nama: "BUDI MULYANA", tgl: "10/12/2010", email: "BUDI@GMAIL.COM", jk: "LAKI - LAKI" },
		{ id: 5, nama: "BUDI MULYANA", tgl: "10/12/2010", email: "BUDI@GMAIL.COM", jk: "LAKI - LAKI" }
	];

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 8;
	const totalPages = Math.ceil(users.length / usersPerPage);

	const displayedUsers = users.slice(
		(currentPage - 1) * usersPerPage,
		currentPage * usersPerPage
	);

	const emptyRows = usersPerPage - displayedUsers.length;

	const handleRowClick = (user) => {
		navigate('/userdetails', { state: user });
	};
	return (
		<div className="mx-4 my-6">
			<div className="flex justify-between items-center mb-3 px-2">
				<div className="text-xl font-bold text-[#222]">DATA PENGGUNA</div>
				  <button className="w-12 h-12 bg-[#4CAF50]/20 text-[#39833C] text-5xl leading-none rounded-full font-medium flex items-center justify-center ml-2">
    				<span className="relative -top-[4px]">+</span>
  				</button>
			</div>

			<div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
				<div className="grid grid-cols-6 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
					<div className="text-center py-3 px-3 rounded-l-xl">NO</div>
					<div className="text-center py-3 px-3">NAMA LENGKAP</div>
					<div className="text-center py-3 px-3">TANGGAL LAHIR</div>
					<div className="text-center py-3 px-3">EMAIL</div>
					<div className="text-center py-3 px-3">JENIS KELAMIN</div>
					<div className="text-center py-3 px-3 rounded-r-xl">ACTION</div>
				</div>
				<div className="divide-y">
					{displayedUsers.map((user, i) => (
						<div
							key={user.id}
							className="grid grid-cols-6 items-center bg-white text-[#222] text-sm hover:bg-[#C8E6C9] cursor-pointer transition"
							onClick={() => handleRowClick(user)}
						>
							<div className="py-5 px-3 text-center">
								{(currentPage - 1) * usersPerPage + i + 1}
							</div>
							<div className="py-5 px-3 text-center">{user.nama}</div>
							<div className="py-5 px-3 text-center">{user.tgl}</div>
							<div className="py-5 px-3 text-center">{user.email}</div>
							<div className="py-5 px-3 text-center">{user.jk}</div>
							<div className="py-5 px-3 flex gap-2 justify-center">
								<button
									className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs"
									onClick={e => { e.stopPropagation(); }}
								>
									EDIT
								</button>
								<button
									className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs"
									onClick={e => { e.stopPropagation(); /* buka konfirmasi hapus */ }}
								>
									HAPUS
								</button>
							</div>
						</div>
					))}
					{Array.from({ length: emptyRows }).map((_, idx) => (
						<div
							key={`empty-${idx}`}
							className="grid grid-cols-6 items-center bg-white text-[#222] text-sm"
							style={{ minHeight: "56px" }}
						>
							{Array.from({ length: 6 }).map((__, colIdx) => (
								<div key={colIdx} className="py-5 px-3">
									&nbsp;
								</div>
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
