// Base URL da API. Em produção, defina VITE_API_URL (ex.: na Vercel) apontando
// para o backend no Laravel Cloud. Em dev local cai no fallback http://localhost.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost";
