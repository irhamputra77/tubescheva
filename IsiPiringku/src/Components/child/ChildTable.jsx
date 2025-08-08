import React from "react";
import ChildRow from "./ChildRow";

function TableHeader() {
    return (
        <div className="grid grid-cols-10 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
            <div className="text-center py-3 px-1 rounded-l-xl">NO</div>
            <div className="text-center py-3 px-2">USER</div>
            <div className="text-center py-3 px-2">NAMA LENGKAP</div>
            <div className="text-center py-3 px-2">TANGGAL LAHIR</div>
            <div className="text-center py-3 px-2">GENDER</div>
            <div className="text-center py-3 px-2">BERAT</div>
            <div className="text-center py-3 px-2">TINGGI</div>
            <div className="text-center py-3 px-2">LINGKAR KEPALA</div>
            <div className="text-center py-3 px-2">KONDISI KELAHIRAN</div>
            <div className="text-center py-3 px-2 rounded-r-xl">ACTION</div>
        </div>
    );
}

function EmptyRows({ count }) {
    if (count <= 0) return null;
    return Array.from({ length: count }).map((_, idx) => (
        <div
            key={`empty-${idx}`}
            className="grid grid-cols-7 items-center bg-white text-[#222] text-sm"
            style={{ minHeight: "56px" }}
        >
            {Array.from({ length: 7 }).map((__, colIdx) => (
                <div key={colIdx} className="py-5 px-3">&nbsp;</div>
            ))}
        </div>
    ));
}

export default function ChildTable({
    rows,
    page,
    perPage,
    onEdit,
    onDelete,
    emptyFill = true,
}) {
    const emptyRows = Math.max(0, perPage - rows.length);

    return (
        <div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
            <TableHeader />
            <div className="divide-y">
                {rows.map((row, i) => (
                    <ChildRow
                        key={row.id || i}
                        row={row}
                        indexNumber={(page - 1) * perPage + i + 1}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
                {emptyFill && <EmptyRows count={emptyRows} />}
            </div>
        </div>
    );
}
