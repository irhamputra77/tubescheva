import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BaseModal from "../common/modal/BaseModal";
import ArticleForm from "../common/modal/form/ArticleForm";
import DeleteConfirmationModal from "../common/modal/DeleteConfirmationModal";
import Pagination from "../common/pagination.jsx";
import useDebouncedValue from "../hooks/useDebouncedValue.jsx";
import ArticleToolbar from "../article/ArticleToolbar.jsx";
import ArticleTable from "../article/ArticleTable.jsx";

export default function ArticleSection() {
    // Ambil dari ENV dan rapikan trailing slash
    const BASE_URL = ((import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000") + "/")
        .replace(/\/+$/, "/");

    const [authorMap, setAuthorMap] = useState({});
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [previewTitle, setPreviewTitle] = useState(null);
    const [previewDescription, setPreviewDescription] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // search w/ debounce
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebouncedValue(searchTerm, 300);

    // Fetch articles
    const fetchData = async (page = 1) => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}v1/article`, {
                params: { page, pageSize: itemsPerPage },
                headers: { Authorization: `Bearer ${token}` },
            });
            setArticles(response.data.data || []);
        } catch (err) {
            if (err.response?.status === 401) setError("Token invalid/expired. Login ulang.");
            else setError(err.message || "Failed to fetch article data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(currentPage); }, [currentPage]);

    // Lazy fetch author name map
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!articles.length || !token) return;

        const unknownIds = Array.from(new Set(articles.map(a => a.AuthorId).filter(Boolean)))
            .filter(id => !authorMap[id]);

        if (!unknownIds.length) return;

        Promise.all(
            unknownIds.map(id =>
                axios
                    .get(`${BASE_URL}v1/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        const u = res.data?.data || res.data || {};
                        return { id, name: u.fullname || u.nama || u.name || "-" };
                    })
                    .catch(() => ({ id, name: "-" }))
            )
        ).then(list => {
            setAuthorMap(prev => {
                const next = { ...prev };
                list.forEach(({ id, name }) => { next[id] = name; });
                return next;
            });
        });
    }, [articles]); // eslint-disable-line

    // Filter client-side
    const filteredArticles = useMemo(() => {
        const q = (debouncedSearch || "").toLowerCase();
        if (!q) return articles;
        return articles.filter(a => {
            const title = (a.title || "").toLowerCase();
            const desc = (a.description || "").toLowerCase();
            const stat = (a.status || "").toLowerCase();
            const author = (authorMap[a.AuthorId] || "").toLowerCase();
            return title.includes(q) || desc.includes(q) || stat.includes(q) || author.includes(q);
        });
    }, [articles, debouncedSearch, authorMap]);

    useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);

    // Pagination berdasarkan hasil filter
    const filteredTotalPages = Math.max(1, Math.ceil((filteredArticles.length || 0) / itemsPerPage));
    const displayedArticles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredArticles.slice(start, start + itemsPerPage);
    }, [filteredArticles, currentPage]);

    // Submit form (tambah/edit)
    const handleFormSubmit = async (formData) => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Belum login!");
            const fd = new FormData();

            if (formData.image instanceof File) fd.append("image", formData.image);
            else fd.append("image", "");
            Object.entries(formData).forEach(([k, v]) => {
                if (k !== "image" && v !== undefined && v !== null) fd.append(k, v);
            });

            let url = `${BASE_URL}v1/article`;
            let method = "post";
            if (editData) { url = `${BASE_URL}v1/article/${editData.id}`; method = "put"; }

            await axios({ url, method, headers: { Authorization: `Bearer ${token}` }, data: fd });

            fetchData(currentPage);
            setModalOpen(false);
            setEditData(null);
        } catch (err) {
            if (err.response?.status === 401) setError("Token tidak valid/expired.");
            else setError(err.message || "Gagal submit artikel.");
        } finally {
            setLoading(false);
        }
    };

    // Delete
    const handleDeleteClick = (id) => { setDeletingId(id); setDeleteModalOpen(true); };
    const confirmDeleteArticle = async () => {
        setDeleteLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Belum login!");
            await axios.delete(`${BASE_URL}v1/article/${deletingId}`, { headers: { Authorization: `Bearer ${token}` } });
            setDeleteModalOpen(false);
            setDeletingId(null);
            fetchData(currentPage);
        } catch (err) {
            if (err.response?.status === 401) setError("Token invalid/expired.");
            else setError(err.message || "Gagal hapus artikel");
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div className="mx-4 my-6">
            <ArticleToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAdd={() => { setModalOpen(true); setEditData(null); }}
            />

            <ArticleTable
                rows={displayedArticles}
                page={currentPage}
                perPage={8}
                baseUrl={BASE_URL}
                authorMap={authorMap}
                onEdit={(row) => { setEditData(row); setModalOpen(true); }}
                onDelete={handleDeleteClick}
                onPreviewImage={(url) => setPreviewImage(url)}
                onPreviewDescription={(text) => setPreviewDescription(text)}
                onPreviewTitle={(text) => setPreviewTitle(text)}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={filteredTotalPages}
                onPageChange={setCurrentPage}
            />

            {/* MODAL FORM */}
            <BaseModal
                show={modalOpen}
                title={editData ? "Edit Artikel" : "Add Artikel"}
                onClose={() => { setModalOpen(false); setEditData(null); }}
            >
                <ArticleForm
                    initialData={editData || {}}
                    onSubmit={handleFormSubmit}
                    onCancel={() => { setModalOpen(false); setEditData(null); }}
                    submitLabel={editData ? "Edit" : "Add"}
                />
            </BaseModal>

            {/* MODAL DELETE */}
            <DeleteConfirmationModal
                show={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setDeletingId(null); }}
                onDelete={confirmDeleteArticle}
                loading={deleteLoading}
            />

            {/* PREVIEW GAMBAR */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                    onClick={() => setPreviewImage(null)}
                    style={{ cursor: "zoom-out" }}
                >
                    <img
                        src={previewImage}
                        alt="preview"
                        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl border-4 border-white"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* PREVIEW DESKRIPSI */}
            {previewDescription && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                    onClick={() => setPreviewDescription(null)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                            onClick={() => setPreviewDescription(null)}
                        >
                            &times;
                        </button>
                        <h2 className="font-bold text-lg mb-2">Deskripsi Artikel</h2>
                        <div className="whitespace-pre-line text-gray-800">{previewDescription}</div>
                    </div>
                </div>
            )}

            {previewTitle && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
                    onClick={() => setPreviewTitle(null)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                            onClick={() => setPreviewTitle(null)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <h2 className="font-bold text-lg mb-3">Judul Lengkap</h2>
                        <div className="text-gray-900 break-words">{previewTitle}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
