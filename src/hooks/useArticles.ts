import { useEffect, useState } from "react";
import { Article } from "types";

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export const useArticles = (): UseArticlesResult => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/articles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};
