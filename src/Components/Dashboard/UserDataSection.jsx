import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BaseModal from "../common/modal/BaseModal";
import UserForm from "../common/modal/form/UserForm";
import DeleteConfirmationModal from "../common/modal/DeleteConfirmationModal";
import { Icon } from "@iconify/react";
import Pagination from "../common/pagination";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");
const USER_URL = `${API_BASE}/v1/user`;
const ROLE_URL = `${API_BASE}/v1/role`;

export default function UserDataSection() {
	const [allUsers, setAllUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 8;

	const [roles, setRoles] = useState([]);

	// Search (debounce)
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");

	// Modal state
	const [modalOpen, setModalOpen] = useState(false);
	const [editData, setEditData] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deletingId, setDeletingId] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
		return () => clearTimeout(t);
	}, [searchTerm]);

	const fetchRoles = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get(ROLE_URL, {
				params: {
					page: 1,
					pageSize: 50,
					order: `[["name","asc"],["createdAt","asc"]]`,
				},
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			});
			setRoles(res.data.data || []);
		} catch (err) {
			console.error(err);
		}
	};

	// Ambil semua user (sekali), lalu filter & paginate di client
	const fetchAllUsers = async () => {
		setLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get(USER_URL, {
				params: {
					page: 1,
					pageSize: 1000,
					order: `[["fullname","asc"]]`,
				},
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			});
			setAllUsers(res.data.data || []);
		} catch (err) {
			if (err.response && err.response.status === 401) {
				setError("Token tidak valid/expired. Silakan login ulang.");
				localStorage.removeItem("token");
			} else {
				setError(err.message || "Gagal fetch data user");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRoles();
		fetchAllUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Reset ke page 1 saat keyword berubah
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearch]);

	// Filtering + Pagination 
	const filteredUsers = useMemo(() => {
		const q = debouncedSearch.toLowerCase();
		if (!q) return allUsers;
		return allUsers.filter((u) => {
			const name = (u.fullname || u.nama || "").toLowerCase();
			const email = (u.email || "").toLowerCase();
			const role = (u.role?.name || "").toLowerCase();
			const gender =
				u.gender === "m"
					? "laki-laki"
					: u.gender === "f"
						? "perempuan"
						: (u.jk || "").toLowerCase();
			return (
				name.includes(q) ||
				email.includes(q) ||
				role.includes(q) ||
				gender.includes(q)
			);
		});
	}, [allUsers, debouncedSearch]);

	const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

	const displayedUsers = useMemo(() => {
		const start = (currentPage - 1) * usersPerPage;
		return filteredUsers.slice(start, start + usersPerPage);
	}, [filteredUsers, currentPage]);

	// Submit ADD/EDIT 
	const handleFormSubmit = async (formData) => {
		setLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("token");

			// body dasar untuk kedua mode
			const body = {
				fullname: formData.nama,
				gender: formData.gender,
				email: formData.email,
				birthDate: formData.tanggal,
				RoleId: formData.RoleId || "ROLE_ID",
			};

			if (editData && editData.id) {
				// UPDATE: TANPA password
				await axios.put(`${USER_URL}/${editData.id}`, body, {
					headers: { Authorization: `Bearer ${token}` },
				});
			} else {
				// ADD: sertakan password (jika diisi dari form)
				const bodyAdd = {
					...body,
					newPassword: formData.password,
					confirmNewPassword: formData.password,
				};
				await axios.post(USER_URL, bodyAdd, {
					headers: { Authorization: `Bearer ${token}` },
				});
			}

			setModalOpen(false);
			setEditData(null);
			await fetchAllUsers();
		} catch (err) {
			setError(err.response?.data?.message || err.message || "Gagal submit user");
		} finally {
			setLoading(false);
		}
	};

	// DELETE 
	const handleDeleteClick = (id) => {
		setDeletingId(id);
		setDeleteModalOpen(true);
	};

	const confirmDeleteUser = async () => {
		setDeleteLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`${USER_URL}/${deletingId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setDeleteModalOpen(false);
			setDeletingId(null);
			await fetchAllUsers();
		} catch (err) {
			setError(
				err.response?.data?.message || err.message || "Gagal hapus user"
			);
		} finally {
			setDeleteLoading(false);
		}
	};


	const emptyRows = usersPerPage - displayedUsers.length;

	if (loading) return <div className="p-6 text-center">Loading...</div>;
	if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

	return (
		<div className="mx-4 my-6">
			{/* Header: Title - Search - Add */}
			<div className="flex items-center mb-3 px-2 gap-3">
				<div className="text-xl font-bold text-[#222] whitespace-nowrap">
					DATA PENGGUNA
				</div>

				<div className="flex-1 flex justify-center">
					<div className="w-full max-w-2xl">
						<div className="flex items-center bg-white/80 rounded-2xl px-4 py-2 shadow-inner border border-gray-200">
							<Icon
								icon="ic:round-search"
								width="22"
								height="22"
								className="mr-2"
								color="#9bd4a0"
							/>
							<input
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search Anything..."
								className="w-full bg-transparent text-[#39833C] placeholder:text-[#9bd4a0] focus:outline-none"
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className="ml-2 text-gray-400 hover:text-gray-600"
									aria-label="Clear search"
								>
									×
								</button>
							)}
						</div>
					</div>
				</div>

				<button
					className="w-12 h-12 bg-[#4CAF50]/20 text-[#39833C] text-5xl leading-none rounded-full font-medium flex items-center justify-center"
					onClick={() => {
						setModalOpen(true);
						setEditData(null);
					}}
					aria-label="Tambah Pengguna"
				>
					<span className="relative -top-[4px]">+</span>
				</button>
			</div>

			{/* Table */}
			<div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
				<div className="grid grid-cols-7 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
					<div className="text-center py-3 px-3 rounded-l-xl">NO</div>
					<div className="text-center py-3 px-3">NAMA LENGKAP</div>
					<div className="text-center py-3 px-3">TANGGAL LAHIR</div>
					<div className="text-center py-3 px-3">EMAIL</div>
					<div className="text-center py-3 px-3">JENIS KELAMIN</div>
					<div className="text-center py-3 px-3">ROLE</div>
					<div className="text-center py-3 px-3 rounded-r-xl">ACTION</div>
				</div>

				<div className="divide-y">
					{displayedUsers.map((user, i) => (
						<div
							key={user.id || i}
							className="grid grid-cols-7 items-center bg-white text-[#222] text-sm"
						>
							<div className="py-5 px-3 text-center">
								{(currentPage - 1) * usersPerPage + i + 1}
							</div>
							<div className="py-5 px-3 text-center">
								{user.fullname || user.nama}
							</div>
							<div className="py-5 px-3 text-center">
								{user.birthDate || user.tanggal}
							</div>
							<div className="py-5 px-3 text-center">{user.email}</div>
							<div className="py-5 px-3 text-center">
								{user.gender === "m"
									? "LAKI - LAKI"
									: user.gender === "f"
										? "PEREMPUAN"
										: user.jk || ""}
							</div>
							<div className="py-5 px-3 text-center">
								{user.role?.name || "-"}
							</div>
							<div className="py-5 px-3 flex gap-2 justify-center">
								<button
									className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs"
									onClick={() => {
										setEditData(user);
										setModalOpen(true);
									}}
								>
									EDIT
								</button>
								<button
									className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs"
									onClick={() => handleDeleteClick(user.id)}
								>
									HAPUS
								</button>
							</div>
						</div>
					))}

					{Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map(
						(_, idx) => (
							<div
								key={`empty-${idx}`}
								className="grid grid-cols-7 items-center bg-white text-[#222] text-sm"
								style={{ minHeight: "56px" }}
							>
								{Array.from({ length: 7 }).map((__, colIdx) => (
									<div key={colIdx} className="py-5 px-3">
										&nbsp;
									</div>
								))}
							</div>
						)
					)}
				</div>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>

			{/* MODAL ADD/EDIT */}
			<BaseModal
				show={modalOpen}
				title={editData ? "Edit Pengguna" : "Tambah Pengguna"}
				onClose={() => {
					setModalOpen(false);
					setEditData(null);
				}}
			>
				<UserForm
					initialData={editData || {}}
					onSubmit={handleFormSubmit}
					onCancel={() => {
						setModalOpen(false);
						setEditData(null);
					}}
					roles={roles}
				/>
			</BaseModal>

			{/* MODAL DELETE */}
			<DeleteConfirmationModal
				show={deleteModalOpen}
				onClose={() => {
					setDeleteModalOpen(false);
					setDeletingId(null);
				}}
				onDelete={confirmDeleteUser}
				loading={deleteLoading}
			/>
		</div>
	);
}
