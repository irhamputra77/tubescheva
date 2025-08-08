import React from "react";

export default function RoleRow({ role, indexNumber, onEdit, onDelete, deleteLoading }) {
    return (
        <div className="grid grid-cols-3 items-center bg-white text-[#222] text-sm">
            <div className="py-5 px-3 text-center">{indexNumber}</div>
            <div className="py-5 px-3 text-center">{role.name}</div>
            <div className="py-5 px-3 flex gap-2 justify-center">
                <button
                    className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs"
                    onClick={() => onEdit(role)}
                >
                    EDIT
                </button>
                <button
                    className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs"
                    onClick={() => onDelete(role.id)}
                    disabled={deleteLoading}
                >
                    HAPUS
                </button>
            </div>
        </div>
    );
}
