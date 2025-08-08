import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import BaseModal from "../common/modal/BaseModal";
import DeleteConfirmationModal from "../common/modal/DeleteConfirmationModal";
import CategoryForm from "../common/modal/form/CategoryForm";
import Pagination from "../common/pagination.jsx";

import CategoryToolbar from "../category/CategoryToolbar.jsx";
import CategoryTable from "../category/CategoryTable.jsx";
import useDebouncedValue from "../hooks/useDebouncedValue.jsx";

// Ambil BASE dari ENV, rapikan trailing slash, lalu bentuk endpoint kategori
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");
const CATEGORY_URL = `${API_BASE}/v1/category`;

export default function KategoriTableSection() {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
    const [deleteLoading, setDeleteLoading] = useState(false);

    // --- SEARCH (client-side) ---
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebouncedValue(searchTerm, 300);

    const filteredCategories = useMemo(() => {
        const q = (debouncedSearch || "").toLowerCase();
        if (!q) return categories;
        return categories.filter((c) => (c.name || "").toLowerCase().includes(q));
    }, [categories, debouncedSearch]);
    // -----------------------------

    // Fetch kategori
    const fetchCategories = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(CATEGORY_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCategories(res.data?.data || []);
        } catch (e) {
            setError(e?.message || "Gagal memuat data kategori.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);
    useEffect(() => { setCurrentPage(1); }, [debouncedSearch]); // reset halaman saat keyword berubah

    // Add/Edit handler
    const handleFormSubmit = async (data) => {
        const token = localStorage.getItem("token");
        try {
            if (editData) {
                await axios.put(`${CATEGORY_URL}/${editData.id}`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(CATEGORY_URL, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setModalOpen(false);
            setEditData(null);
            fetchCategories();
        } catch (e) {
            alert(e?.message || "Gagal menyimpan kategori.");
        }
    };

    // Hapus handler
    const handleDelete = async (id) => {
        setDeleteLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${CATEGORY_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setConfirmDelete({ show: false, id: null });
            fetchCategories();
        } catch (e) {
            alert(e?.message || "Gagal menghapus kategori.");
        } finally {
            setDeleteLoading(false);
        }
    };

    // Pagination (berdasarkan hasil filter)
    const totalPages = Math.max(1, Math.ceil(filteredCategories.length / itemsPerPage));
    const displayedRows = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCategories.slice(start, start + itemsPerPage);
    }, [filteredCategories, currentPage]);

    return (
        <div className="mx-4 my-6">
            <CategoryToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAdd={() => { setEditData(null); setModalOpen(true); }}
            />

            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
                <CategoryTable
                    rows={displayedRows}
                    page={currentPage}
                    perPage={itemsPerPage}
                    onEdit={(row) => { setEditData(row); setModalOpen(true); }}
                    onDelete={(id) => setConfirmDelete({ show: true, id })}
                    deleteLoading={deleteLoading}
                />
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            {/* Modal Add/Edit */}
            <BaseModal
                show={modalOpen}
                title={editData ? "Edit Kategori" : "Add Kategori"}
                onClose={() => { setModalOpen(false); setEditData(null); }}
            >
                <CategoryForm
                    initialData={editData}
                    onSubmit={handleFormSubmit}
                    onCancel={() => { setModalOpen(false); setEditData(null); }}
                    submitLabel={editData ? "Update" : "Add"}
                />
            </BaseModal>

            {/* Modal Delete */}
            <DeleteConfirmationModal
                show={confirmDelete.show}
                onClose={() => setConfirmDelete({ show: false, id: null })}
                onDelete={() => handleDelete(confirmDelete.id)}
                loading={deleteLoading}
            />
        </div>
    );
}
