import React, { useState, useEffect } from "react";

export default function CategoryForm({ initialData = {}, onSubmit, onCancel, submitLabel }) {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(initialData?.name || "");
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="font-semibold">Nama Kategori</label>
                <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="flex gap-3 justify-end mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
