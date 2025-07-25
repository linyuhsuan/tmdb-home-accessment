const TMDB_API_URL = import.meta.env.VITE_API_URL as string;
const TMDB_TOKEN = import.meta.env.VITE_API_TOKEN as string;

// TMDB API 請求
export async function tmdbApiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${TMDB_API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
