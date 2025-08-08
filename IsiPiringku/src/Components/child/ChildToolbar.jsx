import React from "react";
import SearchBar from "../common/Searchbar";

export default function ChildToolbar({ title = "DATA ANAK", searchTerm, onSearchChange, onAdd }) {
    return (
        <div className="flex items-center mb-3 px-2 gap-3">
            <div className="text-xl font-bold text-[#222] whitespace-nowrap">{title}</div>

            <div className="flex-1 flex justify-center">
                <SearchBar
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Cari orang tua, nama anak, gender, atau kondisi kelahiran…"
                    className="max-w-2xl w-full"
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="w-12 h-12 bg-[#4CAF50]/20 text-[#39833C] text-5xl leading-none rounded-full font-medium flex items-center justify-center ml-2"
                    onClick={onAdd}
                    aria-label="Tambah Data Anak"
                >
                    <span className="relative -top-[4px]">+</span>
                </button>
            </div>
        </div>
    );
}
