import React from "react";
import RoleRow from "./RoleRow";
function TableHeader() {
    return (
        <div className="grid grid-cols-3 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
            <div className="py-3 px-3 rounded-l-xl text-center">NO</div>
            <div className="py-3 px-3 text-center">NAMA</div>
            <div className="py-3 px-3 rounded-r-xl text-center">ACTION</div>
        </div>
    );
}

function EmptyRows({ count }) {
    const n = Math.max(0, count);
    if (n === 0) return null;
    return Array.from({ length: n }).map((_, idx) => (
        <div key={`empty-${idx}`} className="grid grid-cols-3 bg-white text-[#222] text-sm" style={{ minHeight: "48px" }}>
            {Array.from({ length: 3 }).map((__, colIdx) => (
                <div key={colIdx} className="py-5 px-3">&nbsp;</div>
            ))}
        </div>
    ));
}

export default function RoleTable({ rows, page, perPage, onEdit, onDelete, deleteLoading }) {
    const empty = Math.max(0, perPage - rows.length);

    return (
        <div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
            <TableHeader />
            <div className="divide-y">
                {rows.map((role, i) => (
                    <RoleRow
                        key={role.id || i}
                        role={role}
                        indexNumber={(page - 1) * perPage + i + 1}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        deleteLoading={deleteLoading}
                    />
                ))}
                <EmptyRows count={empty} />
            </div>
        </div>
    );
}
