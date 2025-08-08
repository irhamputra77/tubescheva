import { Icon } from "@iconify/react";

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search Anything...",
    className = "",
    inputClassName = "",
}) {
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center bg-white/80 rounded-2xl px-4 py-2 shadow-inner border border-gray-200">
                <Icon icon="ic:round-search" width="22" height="22" className="mr-2" color="#9bd4a0" />
                <input
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full bg-transparent text-[#39833C] placeholder:text-[#9bd4a0] focus:outline-none ${inputClassName}`}
                />
                {!!value && (
                    <button
                        onClick={() => onChange?.("")}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
