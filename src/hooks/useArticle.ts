import { useEffect, useState } from "react";
import { Article } from "types";
import { apiFetch } from "helpers/api";

interface UseArticleResult {
  article: Article | null;
  loading: boolean;
}

export const useArticle = (articleSlug: string): UseArticleResult => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    apiFetch<{ article: Article }>(`${process.env.REACT_APP_API_URL}/api/articles/${articleSlug}`)
      .then(data => setArticle(data?.article || null))
      .finally(() => setLoading(false));
  }, [articleSlug]);

  return { article, loading };
};
