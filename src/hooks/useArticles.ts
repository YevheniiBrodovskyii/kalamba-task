import { apiFetch } from "helpers/api";
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
}

export const useArticles = (options?: UseArticlesOptions): UseArticlesResult => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("jwtToken");

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/api/articles${options?.feed ? "/feed" : ""}`;
    const params = new URLSearchParams({
      ...(options?.author && { author: options.author }),
      ...(options?.favorited && { favorited: options.favorited }),
    });

    if (options?.author) params.append("author", options.author);
    if (options?.favorited) params.append("favorited", options.favorited);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

    const headers = options?.feed && token ? { Authorization: `Token ${token}` } : undefined;

    apiFetch<{ articles: Article[] }>(`${url}?${params}`, { headers })
      .then(data => setArticles(data?.articles || []))
      .finally(() => setLoading(false));
  }, [options?.author, options?.feed, options?.favorited, token]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading };
};