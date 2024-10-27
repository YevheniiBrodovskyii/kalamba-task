import { useEffect, useState, useCallback } from "react";
import { Article } from "types";

interface UseArticlesOptions {
  author?: string;
  feed?: boolean;
  favorited?: string;
}

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export const useArticles = (options?: UseArticlesOptions): UseArticlesResult => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const token = localStorage.getItem("jwtToken");

  // useEffect(() => {
  //   const fetchArticlesStatus = async () => {
  //     if (!token) return;

  //     try {
  //       const response = await fetch(`http://localhost:3000/api/articles/`);

  //       if (!response.ok) throw new Error("Failed to fetch article status");
  //       const data = await response.json();
  //       setArticles(data.articles);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Unknown error");
  //     }
  //   };

  //   fetchArticlesStatus();
  // }, [token]);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `http://localhost:3000/api/articles`;

      if (options?.feed) {
        url = `http://localhost:3000/api/articles/feed`;
      } else {
        if (options?.author) {
          url += `?author=${options.author}`;
        }
        if (options?.favorited) {
          url += `?favorited=${options.favorited}`;
        }
      }

      const response = await fetch(url, {
        headers: options?.feed ? { Authorization: `Token ${localStorage.getItem("jwtToken")}` } : undefined,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [options?.author, options?.feed, options?.favorited]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error };
};
