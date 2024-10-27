import { useState, useCallback, useEffect } from "react";

interface ArticleResponse {
  article: {
    favorited: boolean;
    favoritesCount: number;
  };
}

interface UseFavoritePost {
  favoritePost: (slug: string) => Promise<void>;
  unfavoritePost: (slug: string) => Promise<void>;
  isFavorited: boolean;
  favoritesCount: number;
  isLoading: boolean;
  error: string | null;
}

export const useFavoritePost = (slug: string): UseFavoritePost => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:3000/api/articles/${slug}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch article status");
        const data: ArticleResponse = await response.json();
        setIsFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchFavoriteStatus();
  }, [slug, token]);

  const favoritePost = useCallback(
    async (slug: string) => {
      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to favorite post");
        const data: ArticleResponse = await response.json();

        setIsFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const unfavoritePost = useCallback(
    async (slug: string) => {
      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to unfavorite post");
        const data: ArticleResponse = await response.json();
        setIsFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return { favoritePost, unfavoritePost, isFavorited, favoritesCount, isLoading, error };
};
