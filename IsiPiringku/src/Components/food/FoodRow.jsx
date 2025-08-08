import React from "react";

export default function FoodRow({ food, indexNumber, onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-8 items-center bg-white text-[#222] text-sm">
            <div className="py-5 px-3 text-center">{indexNumber}</div>
            <div className="py-5 px-3 text-center">{food.name}</div>
            <div className="py-5 px-3 text-center">{`${food.weight}/${food.weightUnit}`}</div>
            <div className="py-5 px-3 text-center">{food.calory}</div>
            <div className="py-5 px-3 text-center">{food.fat}</div>
            <div className="py-5 px-3 text-center">{food.protein}</div>
            <div className="py-5 px-3 text-center">{food.carb}</div>
            <div className="py-5 px-3 flex gap-2 justify-center">
                <button
                    className="bg-[#E8C097] text-[#6B3B0A] rounded-md px-4 py-1 font-bold text-xs"
                    onClick={() => onEdit(food)}
                >
                    EDIT
                </button>
                <button
                    className="bg-[#A83A3A] text-white rounded-md px-4 py-1 font-bold text-xs"
                    onClick={() => onDelete(food.id)}
                >
                    HAPUS
                </button>
            </div>
        </div>
    );
}
