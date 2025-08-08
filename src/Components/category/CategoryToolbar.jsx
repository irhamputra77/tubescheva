// Components/category/CategoryToolbar.jsx
import React from "react";
import SearchBar from "../common/Searchbar.jsx";

export default function CategoryToolbar({ searchTerm, onSearchChange, onAdd }) {
    return (
        <div className="flex items-center mb-3 px-2 gap-3">
            <h2 className="text-xl font-bold text-[#222] whitespace-nowrap">DATA KATEGORI</h2>

            <div className="flex-1 flex justify-center">
                <SearchBar
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Cari nama kategori…"
                    className="max-w-2xl w-full"
                />
            </div>

            <button
                className="w-12 h-12 bg-[#4CAF50]/20 text-[#39833C] text-5xl leading-none rounded-full font-medium flex items-center justify-center ml-2"
                onClick={onAdd}
                aria-label="Tambah Kategori"
            >
                <span className="relative -top-[4px]">+</span>
            </button>
        </div>
    );
}
