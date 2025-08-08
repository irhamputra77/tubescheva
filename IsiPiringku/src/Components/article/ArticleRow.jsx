import React from "react";

export default function ArticleRow({
    row,
    idxNumber,
    baseUrl,
    authorName,
    onEdit,
    onDelete,
    onPreviewImage,
    onPreviewDescription,
    onPreviewTitle = () => { },
}) {
    const fullTitle = row?.title || "-";
    const fullDesc = row?.description || "";

    return (
        <div className="grid grid-cols-9 items-center bg-white text-[#222] text-sm">
            <div className="py-3 px-3 text-center">{idxNumber}</div>
            <div className="py-3 px-3 text-center">{authorName || "…"}</div>

            <div
                className="py-3 px-3 text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[260px] cursor-pointer hover:underline"
                title={fullTitle}
                onClick={() => fullTitle !== "-" && onPreviewTitle(fullTitle)}
                aria-label="Lihat judul lengkap"
            >
                {fullTitle}
            </div>

            <div
                className="py-3 px-3 text-left cursor-pointer max-w-[220px] truncate hover:underline"
                title="Klik untuk lihat deskripsi lengkap"
                onClick={() => onPreviewDescription(fullDesc)}
            >
                {fullDesc || <span className="italic text-gray-400">Tidak ada deskripsi</span>}
            </div>

            <div className="py-3 px-3 text-center font-bold">
                {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
            </div>

            <div className="py-3 px-3 flex justify-center">
                <span className="px-5 py-1 rounded-lg font-semibold text-sm border">
                    {row.status}
                </span>
            </div>

            <div className="py-3 px-3 text-center">
                {row.image ? (
                    <img
                        src={baseUrl + row.image}
                        alt="cover"
                        className="w-16 h-12 object-cover rounded mx-auto cursor-pointer transition hover:scale-110"
                        onClick={() => onPreviewImage(baseUrl + row.image)}
                        onError={(e) => (e.currentTarget.src = "/default-placeholder.png")}
                    />
                ) : (
                    <span className="italic text-gray-400">Tidak ada cover</span>
                )}
            </div>

            <div className="py-5 px-3 flex gap-2 justify-center col-span-2">
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
