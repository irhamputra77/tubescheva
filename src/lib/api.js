import axios from "axios";

function getBaseUrl() {
    // urutan prioritas: runtime override → window global → .env → default
    return (
        localStorage.getItem("__API_BASE_URL__") ||
        window.__API_BASE_URL__ ||
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:8000"
    );
}

export let api = axios.create({ baseURL: getBaseUrl() });

// helper untuk mengubah baseURL saat app sudah jalan
export function setApiBaseUrl(nextUrl) {
    localStorage.setItem("__API_BASE_URL__", nextUrl);
    api = axios.create({ baseURL: nextUrl }); // re-create instance
}
