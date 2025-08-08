import React from "react";
import FoodRow from "./FoodRow.jsx";

function TableHeader() {
    return (
        <div className="grid grid-cols-8 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
            <div className="py-3 px-3 rounded-l-xl text-center">NO</div>
            <div className="py-3 px-3 text-center">NAMA MAKANAN</div>
            <div className="py-3 px-3 text-center">BERAT</div>
            <div className="py-3 px-3 text-center">KALORI</div>
            <div className="py-3 px-3 text-center">LEMAK</div>
            <div className="py-3 px-3 text-center">PROTEIN</div>
            <div className="py-3 px-3 text-center">KARBO</div>
            <div className="py-3 px-3 rounded-r-xl text-center">ACTION</div>
        </div>
    );
}

function EmptyRows({ count }) {
    const n = Math.max(0, count);
    if (n === 0) return null;
    return Array.from({ length: n }).map((_, idx) => (
        <div
            key={`empty-${idx}`}
            className="grid grid-cols-8 bg-white text-[#222] text-sm"
            style={{ minHeight: "48px" }}
        >
            {Array.from({ length: 8 }).map((__, colIdx) => (
                <div key={colIdx} className="py-5 px-3">&nbsp;</div>
            ))}
        </div>
    ));
}

export default function FoodTable({ rows, page, perPage, onEdit, onDelete }) {
    const empty = Math.max(0, perPage - rows.length);

    return (
        <div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
            <TableHeader />
            <div className="divide-y">
                {rows.map((food, i) => (
                    <FoodRow
                        key={food.id || i}
                        food={food}
                        indexNumber={(page - 1) * perPage + i + 1}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
                <EmptyRows count={empty} />
            </div>
        </div>
    );
}
