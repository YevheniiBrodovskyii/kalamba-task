import { useEffect, useState } from "react";
import { Article } from "types";

interface UseArticleResult {
  article: Article | null;
  loading: boolean;
  error: string | null;
}

export const useArticle = (articleSlug: string): UseArticleResult => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/articles/${articleSlug}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticle(data.article);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleSlug]);

  return { article, loading, error };
};
