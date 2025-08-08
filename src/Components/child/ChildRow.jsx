import React from "react";

export default function ChildRow({ row, indexNumber, onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-10 items-center bg-white text-[#222] text-sm">
            <div className="py-5 px-1 text-center">{indexNumber}</div>
            <div className="py-5 px-2 text-center">{row.parent?.fullname || "-"}</div>
            <div className="py-5 px-2 text-center">{row.fullname}</div>
            <div className="py-5 px-2 text-center">
                {row.birthDate ? new Date(row.birthDate).toLocaleDateString() : "-"}
            </div>
            <div className="py-5 px-2 text-center">
                {row.gender === "m" ? "LAKI-LAKI" : row.gender === "f" ? "PEREMPUAN" : "-"}
            </div>
            <div className="py-5 px-2 text-center">{row.weight || "-"}</div>
            <div className="py-5 px-2 text-center">{row.height || "-"}</div>
            <div className="py-5 px-2 text-center">{row.headCircumference || "-"}</div>
            <div className="py-5 px-2 text-center">{row.birthCondition || "-"}</div>
            <div className="py-5 px-2 flex gap-2 justify-center">
                <button
                    className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs"
                    onClick={() => onEdit(row)}
                >
                    EDIT
                </button>
                <button
                    className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs"
                    onClick={() => onDelete(row.id)}
                >
                    HAPUS
                </button>
            </div>
        </div>
    );
}
