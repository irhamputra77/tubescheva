import React from "react";
import ArticleRow from "./ArticleRow.jsx";

function TableHeader() {
    return (
        <div className="grid grid-cols-9 bg-[#D7D7D7] text-[#575757] text-sm font-semibold rounded-t-2xl overflow-hidden">
            <div className="py-3 px-3 rounded-l-xl text-center">NO</div>
            <div className="py-3 px-3 text-center">AUTHOR</div>
            <div className="py-3 px-3 text-center">JUDUL</div>
            <div className="py-3 px-3 text-center">DESKRIPSI</div>
            <div className="py-3 px-3 text-center">TANGGAL</div>
            <div className="py-3 px-3 text-center">STATUS</div>
            <div className="py-3 px-3 text-center">FOTO</div>
            <div className="py-3 px-3 text-center rounded-r-xl col-span-2">ACTION</div>
        </div>
    );
}

function EmptyRows({ count }) {
    if (count <= 0) return null;
    return Array.from({ length: count }).map((_, idx) => (
        <div key={`empty-${idx}`} className="grid grid-cols-9 bg-white text-[#222] text-sm" style={{ minHeight: "48px" }}>
            {Array.from({ length: 9 }).map((__, colIdx) => (
                <div key={colIdx} className="py-5 px-3">&nbsp;</div>
            ))}
        </div>
    ));
}

export default function ArticleTable({
    rows,
    page,
    perPage,
    baseUrl,
    authorMap,
    onEdit,
    onDelete,
    onPreviewImage,
    onPreviewDescription,
    onPreviewTitle = () => { },
}) {
    const emptyRows = Math.max(0, perPage - rows.length);

    return (
        <div className="rounded-2xl bg-[#f3f3f3] shadow-inner p-2">
            <TableHeader />
            <div className="divide-y">
                {rows.map((row, i) => (
                    <ArticleRow
                        key={row.id || i}
                        row={row}
                        idxNumber={(page - 1) * perPage + i + 1}
                        baseUrl={baseUrl}
                        authorName={authorMap[row.AuthorId]}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onPreviewImage={onPreviewImage}
                        onPreviewDescription={onPreviewDescription}
                        onPreviewTitle={onPreviewTitle}
                    />
                ))}
                <EmptyRows count={emptyRows} />
            </div>
        </div>
    );
}
