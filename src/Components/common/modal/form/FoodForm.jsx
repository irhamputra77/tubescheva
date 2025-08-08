import React, { useState } from "react";

export default function FoodForm({ initialData, onSubmit, onCancel, submitLabel }) {
    initialData = initialData || {};
    const [name, setName] = useState(initialData.name || "");
    const [weight, setWeight] = useState(initialData.weight || "");
    const [weightUnit, setWeightUnit] = useState(initialData.weightUnit || "g");
    const [calory, setCalory] = useState(initialData.calory || "");
    const [fat, setFat] = useState(initialData.fat || "");
    const [protein, setProtein] = useState(initialData.protein || "");
    const [carb, setCarb] = useState(initialData.carb || "");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi sebelum submit
        if (!name || !weight || !weightUnit || !calory || !fat || !protein || !carb) {
            setError("Semua field wajib diisi!");
            return;
        }

        // Pastikan tidak ada value yang kosong/NaN/null
        const payload = {
            name,
            weight: Number(weight),
            weightUnit,
            calory: Number(calory),
            fat: Number(fat),
            protein: Number(protein),
            carb: Number(carb),
        };

        // Debug log untuk cek field yang dikirim
        console.log("Payload submit:", payload);

        // Final validasi (tidak boleh ada NaN)
        for (const key of ["weight", "calory", "fat", "protein", "carb"]) {
            if (isNaN(payload[key]) || payload[key] === "") {
                setError(`Field ${key} harus diisi dengan angka.`);
                return;
            }
        }

        setError(""); // clear error
        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="text-red-600 mb-2">{error}</div>}

            <div className="mb-3">
                <label className="font-semibold">Nama Makanan</label>
                <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="font-semibold">Berat</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        className="block w-full border rounded px-3 py-2 mt-1"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        min={0}
                        required
                    />
                    <select
                        className="border rounded px-2 py-2 mt-1"
                        value={weightUnit}
                        onChange={e => setWeightUnit(e.target.value)}
                    >
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        {/* Tambah satuan lain jika perlu */}
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label className="font-semibold">Kalori</label>
                <input
                    type="number"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={calory}
                    onChange={e => setCalory(e.target.value)}
                    min={0}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="font-semibold">Lemak</label>
                <input
                    type="number"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={fat}
                    onChange={e => setFat(e.target.value)}
                    min={0}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="font-semibold">Protein</label>
                <input
                    type="number"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={protein}
                    onChange={e => setProtein(e.target.value)}
                    min={0}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="font-semibold">Karbohidrat</label>
                <input
                    type="number"
                    className="block w-full border rounded px-3 py-2 mt-1"
                    value={carb}
                    onChange={e => setCarb(e.target.value)}
                    min={0}
                    required
                />
            </div>
            <div className="flex gap-3 justify-end mt-4">
                <button type="button" onClick={onCancel}
                    className="px-5 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition">
                    Cancel
                </button>
                <button type="submit"
                    className="px-5 py-2 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition">
                    {submitLabel || "Add"}
                </button>
            </div>
        </form>
    );
}
