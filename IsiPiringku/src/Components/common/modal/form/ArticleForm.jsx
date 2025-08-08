import React, { useState, useEffect } from "react";

export default function ArticleForm({ initialData = {}, onSubmit, onCancel, submitLabel }) {
    const [title, setTitle] = useState(initialData.title || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [status, setStatus] = useState(initialData.status || "draft");
    const [CategoryId, setCategoryId] = useState(initialData.CategoryId || "");
    const [image, setImage] = useState(initialData.image || "");
    const [imagePreview, setImagePreview] = useState("");

    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(false);
    const [catError, setCatError] = useState("");

    useEffect(() => {
        setTitle(initialData.title || "");
        setDescription(initialData.description || "");
        setStatus(initialData.status || "draft");
        setCategoryId(initialData.CategoryId || "");
        setImage(initialData.image || "");
        setImagePreview("");
    }, [initialData]);

    useEffect(() => {
        const fetchCategories = async () => {
            setCatLoading(true);
            setCatError("");
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Belum login! Token tidak ditemukan.");
                const res = await fetch("https://kwkm0r8k-8000.asse.devtunnels.ms/v1/category", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.status === 401) throw new Error("Token tidak valid/expired.");
                if (!res.ok) throw new Error("Gagal fetch kategori");
                const data = await res.json();
                setCategories(data.data || []);
            } catch (err) {
                setCatError(err.message);
            } finally {
                setCatLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Jika upload baru
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Saat submit, kirim image/file baru ATAU image lama (string)
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, status, CategoryId, image }); // image: File atau String
    };

    const BASE_URL = "https://kwkm0r8k-8000.asse.devtunnels.ms/";

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="font-semibold">Judul</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                    className="block w-full border rounded px-3 py-2 mt-1" required />
            </div>
            <div className="mb-3">
                <label className="font-semibold">Deskripsi</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                    className="block w-full border rounded px-3 py-2 mt-1" rows={4} required />
            </div>
            <div className="mb-3">
                <label className="font-semibold">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}
                    className="block w-full border rounded px-3 py-2 mt-1">
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="font-semibold">Kategori</label>
                <select
                    value={CategoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    className="block w-full border rounded px-3 py-2 mt-1"
                    required
                >
                    <option value="">-- Pilih Kategori --</option>
                    {catLoading && <option value="">Loading...</option>}
                    {catError && <option value="">{catError}</option>}
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="font-semibold">Cover Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full" />
                {/* Preview gambar baru */}
                {imagePreview && (
                    <div className="mt-2">
                        <span className="text-xs text-gray-500">Preview gambar baru:</span>
                        <img src={imagePreview} alt="preview" className="w-28 h-20 rounded shadow mt-1" />
                    </div>
                )}
                {/* Preview gambar lama */}
                {!imagePreview && typeof image === "string" && image && (
                    <div className="mt-2">
                        <img src={BASE_URL + image} alt="cover lama" className="w-28 h-20 rounded shadow mt-1" />
                    </div>
                )}
            </div>
            <div className="flex gap-3 justify-end mt-4">
                <button type="button" onClick={onCancel}
                    className="px-5 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition">Cancel</button>
                <button type="submit"
                    className="px-5 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition">{submitLabel || "Add"}</button>
            </div>
        </form>
    );
}
