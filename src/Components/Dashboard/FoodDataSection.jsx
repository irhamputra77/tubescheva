import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import BaseModal from "../common/modal/BaseModal";
import FoodForm from "../common/modal/form/FoodForm";
import DeleteConfirmationModal from "../common/modal/DeleteConfirmationModal";
import Pagination from "../common/pagination.jsx";

import FoodToolbar from "../food/FoodToolbar.jsx";
import FoodTable from "../food/FoodTable.jsx";
import useDebouncedValue from "../hooks/useDebouncedValue.jsx";

export default function FoodDataSection() {
    // ── BASE URL dari ENV (tanpa trailing slash ganda) ────────────────────────────
    const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");
    const FOOD_URL = `${API_BASE}/v1/food-item`;
    // ─────────────────────────────────────────────────────────────────────────────

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
    const [totalPages, setTotalPages] = useState(1);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // search + debounce
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebouncedValue(searchTerm, 300);

    const filteredFoods = useMemo(() => {
        const q = (debouncedSearch || "").toLowerCase();
        if (!q) return foods;
        return foods.filter((f) => {
            const name = (f.name || "").toLowerCase();
            const weight = `${f.weight || ""}`.toLowerCase();
            const unit = (f.weightUnit || "").toLowerCase();
            const cal = `${f.calory ?? ""}`.toLowerCase();
            const fat = `${f.fat ?? ""}`.toLowerCase();
            const pro = `${f.protein ?? ""}`.toLowerCase();
            const carb = `${f.carb ?? ""}`.toLowerCase();
            return (
                name.includes(q) ||
                unit.includes(q) ||
                weight.includes(q) ||
                cal.includes(q) ||
                fat.includes(q) ||
                pro.includes(q) ||
                carb.includes(q)
            );
        });
    }, [foods, debouncedSearch]);

    // FETCH DATA
    const fetchData = async (page = 1) => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Anda belum login. Silakan login ulang.");
                setLoading(false);
                return;
            }
            const response = await axios.get(FOOD_URL, {
                params: { page, pageSize: usersPerPage, order: '[["name","asc"]]' },
                headers: { Authorization: `Bearer ${token}` },
            });
            setFoods(response.data.data || []);
            setTotalPages(Math.max(1, Math.ceil((response.data.total || 0) / usersPerPage)));
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Token tidak valid/expired. Silakan login ulang.");
                localStorage.removeItem("token");
            } else {
                setError(err.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(currentPage); }, [currentPage]); // eslint-disable-line

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    const displayedFoods = filteredFoods;

    return (
        <div className="mx-4 my-6">
            <FoodToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAdd={() => { setModalOpen(true); setEditData(null); }}
            />

            <FoodTable
                rows={displayedFoods}
                page={currentPage}
                perPage={usersPerPage}
                onEdit={(food) => { setEditData(food); setModalOpen(true); }}
                onDelete={(id) => { setDeletingId(id); setDeleteModalOpen(true); }}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Modal Add/Edit */}
            <BaseModal
                show={modalOpen}
                title={editData ? "Edit Makanan" : "Tambah Makanan"}
                onClose={() => { setEditData(null); setModalOpen(false); }}
            >
                <FoodForm
                    initialData={editData}
                    onSubmit={(formData) => {
                        if (editData) {
                            // update
                            (async () => {
                                setLoading(true); setError("");
                                try {
                                    const token = localStorage.getItem("token");
                                    if (!token) throw new Error("Anda belum login. Silakan login ulang.");
                                    await axios.put(`${FOOD_URL}/${editData.id}`, formData, {
                                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                    });
                                    await fetchData(currentPage);
                                    setModalOpen(false); setEditData(null);
                                } catch (err) {
                                    if (err.response?.status === 401) {
                                        setError("Token tidak valid/expired. Silakan login ulang.");
                                        localStorage.removeItem("token");
                                    } else setError(err.message || "Gagal update data makanan");
                                } finally { setLoading(false); }
                            })();
                        } else {
                            // add
                            (async () => {
                                setLoading(true); setError("");
                                try {
                                    const token = localStorage.getItem("token");
                                    if (!token) throw new Error("Anda belum login. Silakan login ulang.");
                                    await axios.post(FOOD_URL, formData, {
                                        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                    });
                                    await fetchData(currentPage);
                                    setModalOpen(false);
                                } catch (err) {
                                    if (err.response?.status === 401) {
                                        setError("Token tidak valid/expired. Silakan login ulang.");
                                        localStorage.removeItem("token");
                                    } else setError(err.message || "Gagal tambah data makanan");
                                } finally { setLoading(false); }
                            })();
                        }
                    }}
                    onCancel={() => { setEditData(null); setModalOpen(false); }}
                    submitLabel={editData ? "Edit" : "Add"}
                />
            </BaseModal>

            {/* Modal Delete */}
            <DeleteConfirmationModal
                show={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setDeletingId(null); }}
                onDelete={async () => {
                    setDeleteLoading(true); setError("");
                    try {
                        const token = localStorage.getItem("token");
                        if (!token) throw new Error("Anda belum login. Silakan login ulang.");
                        await axios.delete(`${FOOD_URL}/${deletingId}`, { headers: { Authorization: `Bearer ${token}` } });
                        setDeleteModalOpen(false); setDeletingId(null);
                        await fetchData(currentPage);
                    } catch (err) {
                        if (err.response?.status === 401) {
                            setError("Token tidak valid/expired. Silakan login ulang.");
                            localStorage.removeItem("token");
                        } else setError(err.message || "Gagal hapus data makanan");
                    } finally { setDeleteLoading(false); }
                }}
                loading={deleteLoading}
            />
        </div>
    );
}
