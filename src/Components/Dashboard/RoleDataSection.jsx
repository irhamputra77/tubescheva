import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import BaseModal from "../common/modal/BaseModal";
import RoleForm from "../common/modal/form/RoleForm";
import DeleteConfirmationModal from "../common/modal/DeleteConfirmationModal";
import Pagination from "../common/pagination.jsx";

import RoleToolbar from "../role/RoleToolbar.jsx";
import RoleTable from "../role/RoleTable.jsx";
import useDebouncedValue from "../hooks/useDebouncedValue.jsx";

export default function RoleDataSection() {
    // ---- BASE URL dari .env ----
    const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");
    const ROLE_URL = `${API_BASE}/v1/role`;
    // ----------------------------

    const [editData, setEditData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [roles, setRoles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 8;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // search (debounced)
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebouncedValue(search, 300);

    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const fetchRoles = useCallback(async () => {
        const token = localStorage.getItem("token");
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(ROLE_URL, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    name: debouncedSearch || undefined,
                    page: currentPage,
                    pageSize: rolesPerPage,
                    order: '[["name","asc"],["createdAt","asc"]]',
                },
            });
            const rows = response.data.data;
            if (Array.isArray(rows)) {
                setRoles(rows);
                setTotalPages(1);
            } else {
                setRoles(rows.rows || []);
                setTotalPages(Math.ceil((rows.count || 1) / rolesPerPage));
            }
        } catch {
            setError("Gagal mengambil data role.");
        }
        setLoading(false);
    }, [ROLE_URL, debouncedSearch, currentPage, rolesPerPage]);

    useEffect(() => { fetchRoles(); }, [fetchRoles]);
    useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);

    // ADD/EDIT ROLE
    const handleFormSubmit = async (data) => {
        setFormLoading(true);
        setFormError("");
        const token = localStorage.getItem("token");
        try {
            if (editData?.id) {
                await axios.put(`${ROLE_URL}/${editData.id}`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(ROLE_URL, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setModalOpen(false);
            setEditData(null);
            fetchRoles();
        } catch (err) {
            setFormError(err.response?.data?.message || "Gagal menyimpan data role.");
        }
        setFormLoading(false);
    };

    // DELETE ROLE
    const handleDelete = async (id) => {
        setDeleteLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${ROLE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setConfirmDelete({ show: false, id: null });
            fetchRoles();
        } catch (err) {
            if (
                err?.response?.status === 500 &&
                (
                    (err?.response?.data?.message && err.response.data.message.toLowerCase().includes("foreign key")) ||
                    (err?.response?.data?.error && err.response.data.error.toLowerCase().includes("foreign key"))
                )
            ) {
                alert("Tidak bisa menghapus role karena masih ada user yang menggunakan role ini.");
            } else {
                alert("Gagal menghapus role. Silakan coba lagi.");
            }
        }
        setDeleteLoading(false);
    };

    return (
        <div className="mx-4 my-6">
            <RoleToolbar
                searchTerm={search}
                onSearchChange={setSearch}
                onAdd={() => {
                    setEditData(null);
                    setFormError("");
                    setModalOpen(true);
                }}
            />
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
                <RoleTable
                    rows={roles}
                    page={currentPage}
                    perPage={rolesPerPage}
                    onEdit={(role) => {
                        setEditData(role);
                        setFormError("");
                        setModalOpen(true);
                    }}
                    onDelete={(id) => setConfirmDelete({ show: true, id })}
                    deleteLoading={deleteLoading}
                />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <BaseModal
                show={modalOpen}
                title={editData ? "Edit Role" : "Add Role"}
                onClose={() => {
                    setModalOpen(false);
                    setEditData(null);
                    setFormError("");
                }}
            >
                <RoleForm
                    initialData={editData}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setModalOpen(false);
                        setEditData(null);
                        setFormError("");
                    }}
                    submitLabel={editData ? "Update" : "Add"}
                    loading={formLoading}
                    error={formError}
                />
            </BaseModal>

            <DeleteConfirmationModal
                show={confirmDelete.show}
                onClose={() => setConfirmDelete({ show: false, id: null })}
                onDelete={() => handleDelete(confirmDelete.id)}
                loading={deleteLoading}
            />
        </div>
    );
}
