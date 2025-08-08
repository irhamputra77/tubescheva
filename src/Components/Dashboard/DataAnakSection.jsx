import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BaseModal from "../common/modal/BaseModal";
import ChildForm from "../common/modal/form/ChildForm";
import DeleteConfirmationModal from "../common/modal/DeleteConfirmationModal";
import Pagination from "../common/pagination";
import ChildToolbar from "../child/ChildToolbar";
import ChildTable from "../child/ChildTable";
import useDebouncedValue from "../hooks/useDebouncedValue";

const BASE_URL = ((import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000") + "/")
    .replace(/\/+$/, "/");

export default function DataAnakSection() {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // modal states
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // search
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebouncedValue(searchTerm, 300);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    // Fetch
    const fetchAll = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BASE_URL}v1/child`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const rows = res.data?.data || res.data || [];
            setChildren(Array.isArray(rows) ? rows : []);
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Token tidak valid/expired. Silakan login ulang.");
                localStorage.removeItem("token");
            } else {
                setError(err.message || "Gagal mengambil data anak");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);
    useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);

    // CREATE/UPDATE
    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const fd = new FormData();

            if (formValues.fullname != null) fd.append("fullname", String(formValues.fullname).trim());
            if (formValues.birthDate) fd.append("birthDate", formValues.birthDate);
            if (formValues.gender === "m" || formValues.gender === "f") fd.append("gender", formValues.gender);
            if (formValues.birthCondition != null) fd.append("birthCondition", String(formValues.birthCondition).trim());

            const toInt = (v) => (v === "" || v == null ? null : Number.parseInt(v, 10));
            const w = toInt(formValues.weight);
            const h = toInt(formValues.height);
            const hc = toInt(formValues.headCircumference);
            if (Number.isInteger(w)) fd.append("weight", String(w));
            if (Number.isInteger(h)) fd.append("height", String(h));
            if (Number.isInteger(hc)) fd.append("headCircumference", String(hc));
            if (formValues.photo instanceof File) fd.append("photo", formValues.photo);
            else fd.append("photo", "");

            let url = `${BASE_URL}v1/child`;
            let method = "post";
            if (editData?.id) { url = `${BASE_URL}v1/child/${editData.id}`; method = "put"; }

            await axios({ url, method, data: fd, headers: { Authorization: `Bearer ${token}` } });

            setModalOpen(false);
            setEditData(null);
            await fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Gagal menyimpan data anak");
        } finally {
            setLoading(false);
        }
    };

    // DELETE
    const handleDeleteClick = (id) => { setDeletingId(id); setDeleteModalOpen(true); };
    const confirmDelete = async () => {
        setDeleteLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}v1/child/${deletingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDeleteModalOpen(false);
            setDeletingId(null);
            await fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Gagal menghapus data anak");
        } finally {
            setDeleteLoading(false);
        }
    };

    // FILTER + SLICE
    const filteredRows = useMemo(() => {
        const q = (debouncedSearch || "").toLowerCase();
        if (!q) return children;
        return children.filter((row) => {
            const parent = (row.parent?.fullname || row.parent?.name || "").toLowerCase();
            const name = (row.fullname || "").toLowerCase();
            const gender = row.gender === "m" ? "laki-laki" : row.gender === "f" ? "perempuan" : (row.gender || "").toLowerCase();
            const cond = (row.birthCondition || "").toLowerCase();
            return parent.includes(q) || name.includes(q) || gender.includes(q) || cond.includes(q);
        });
    }, [children, debouncedSearch]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / perPage));
    const displayedRows = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return filteredRows.slice(start, start + perPage);
    }, [filteredRows, currentPage]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div className="mx-4 my-6">
            <ChildToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAdd={() => { setModalOpen(true); setEditData(null); }}
            />

            <ChildTable
                rows={displayedRows}
                page={currentPage}
                perPage={8}
                onEdit={(row) => { setEditData(row); setModalOpen(true); }}
                onDelete={handleDeleteClick}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Modal Add/Edit */}
            <BaseModal
                show={modalOpen}
                title={editData ? "Edit Data Anak" : "Tambah Data Anak"}
                onClose={() => { setModalOpen(false); setEditData(null); }}
            >
                <ChildForm
                    initialData={editData || {}}
                    onSubmit={handleFormSubmit}
                    onCancel={() => { setModalOpen(false); setEditData(null); }}
                />
            </BaseModal>

            {/* Modal Delete */}
            <DeleteConfirmationModal
                show={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setDeletingId(null); }}
                onDelete={confirmDelete}
                loading={deleteLoading}
                title="Hapus Data Anak?"
                message="Data yang dihapus tidak dapat dikembalikan."
            />
        </div>
    );
}
