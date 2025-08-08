import React, { useEffect, useState } from "react";

export default function ChildForm({ initialData = {}, onSubmit, onCancel }) {
    const [fullname, setFullname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [birthCondition, setBirthCondition] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");

    // === FOTO: sama seperti ArticleForm ===
    const [photo, setPhoto] = useState(initialData.photo || ""); // File atau path lama (string)
    const [photoPreview, setPhotoPreview] = useState("");         // preview untuk file baru

    const BASE_URL = "https://kwkm0r8k-8000.asse.devtunnels.ms/";

    // Isi ulang form saat initialData berubah
    useEffect(() => {
        setFullname(initialData.fullname || "");
        setBirthDate(initialData.birthDate ? initialData.birthDate.substring(0, 10) : "");
        setGender(initialData.gender || "");
        setBirthCondition(initialData.birthCondition || "");
        setWeight(initialData.weight ?? "");
        setHeight(initialData.height ?? "");
        setHeadCircumference(initialData.headCircumference ?? "");

        // foto lama (string) ditaruh di "photo", preview direset
        setPhoto(initialData.photo || initialData.photoUrl || "");
        setPhotoPreview("");
    }, [initialData]);

    // Handler foto baru (File)
    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);                         // simpan File
            setPhotoPreview(URL.createObjectURL(file)); // tampilkan preview File baru
        } else {
            setPhoto(initialData.photo || initialData.photoUrl || "");
            setPhotoPreview("");
        }
    };

    const submit = (e) => {
        e.preventDefault();
        onSubmit({
            fullname,
            birthDate,                  // "YYYY-MM-DD"
            gender,                     // 'm' | 'f'
            birthCondition,
            weight: weight === "" ? null : parseInt(weight, 10),
            height: height === "" ? null : parseInt(height, 10),
            headCircumference: headCircumference === "" ? null : parseInt(headCircumference, 10),
            photo,                      // File | string (parent akan kirim "" jika bukan File, mengikuti Article)
        });
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <div>
                <label className="font-semibold">Nama Lengkap</label>
                <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="font-semibold">Tanggal Lahir</label>
                    <input
                        type="date"
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold">Gender</label>
                    <select
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="" disabled>Pilih</option>
                        <option value="m">Laki-laki</option>
                        <option value="f">Perempuan</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="font-semibold">Kondisi Kelahiran</label>
                <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={birthCondition}
                    onChange={(e) => setBirthCondition(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <label className="font-semibold">Berat (kg)</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div>
                    <label className="font-semibold">Tinggi (cm)</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div>
                    <label className="font-semibold">Lingkar Kepala (cm)</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={headCircumference}
                        onChange={(e) => setHeadCircumference(e.target.value)}
                    />
                </div>
            </div>

            {/* FOTO – pola sama dengan ArticleForm */}
            <div className="mb-3">
                <label className="font-semibold">Foto</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full"
                />
                {/* Preview file baru */}
                {photoPreview && (
                    <div className="mt-2">
                        <span className="text-xs text-gray-500">Preview foto baru:</span>
                        <img src={photoPreview} alt="preview" className="w-28 h-20 rounded shadow mt-1" />
                    </div>
                )}
                {/* Preview foto lama */}
                {!photoPreview && typeof photo === "string" && photo && (
                    <div className="mt-2">
                        <img src={BASE_URL + photo} alt="foto lama" className="w-28 h-20 rounded shadow mt-1" />
                    </div>
                )}
            </div>

            <div className="flex gap-3 justify-end pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 bg-gray-100 text-gray-700 rounded font-semibold hover:bg-gray-200 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition"
                >
                    {initialData?.id ? "Update" : "Add"}
                </button>
            </div>
        </form>
    );
}
