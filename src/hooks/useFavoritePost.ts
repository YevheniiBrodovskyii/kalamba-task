import { useState, useEffect, useCallback, useMemo } from "react";
import { apiFetch } from "helpers/api";
import { showSuccessNotification } from "components";

interface UseFavoritePost {
  toggleFavorite: (favorite: boolean) => Promise<void>;
  isFavorited: boolean;
  favoritesCount: number;
  isLoading: boolean;
}

export const useFavoritePost = (slug: string): UseFavoritePost => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const token = useMemo(() => localStorage.getItem("jwtToken"), []);
  const headers = useMemo(() => (token ? { Authorization: `Token ${token}` } : undefined), [token]);

  useEffect(() => {
    apiFetch<{ article: { favorited: boolean; favoritesCount: number } }>(
      `${process.env.REACT_APP_API_URL}/api/articles/${slug}`,
      { headers }
    ).then(data => {
      if (data) {
        setIsFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
      }
    });
  }, [slug, headers]);

  const toggleFavorite = useCallback(
    async (favorite: boolean) => {
      setIsLoading(true);
      const method = favorite ? "POST" : "DELETE";
      const url = `${process.env.REACT_APP_API_URL}/api/articles/${slug}/favorite`;

      const data = await apiFetch<{ article: { favorited: boolean; favoritesCount: number } }>(url, { method, headers });
      if (data) {
        setIsFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
        showSuccessNotification(favorite ? "Favorited successfully!" : "Unfavorited successfully!");
      }
      setIsLoading(false);
    },
    [slug, headers]
  );

  return { toggleFavorite, isFavorited, favoritesCount, isLoading };
};
