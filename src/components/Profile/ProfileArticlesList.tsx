import { ArticlePreview } from "components/ArticleList/ArticlePreview";
import { FC } from "react";
import { useArticles } from "hooks/useArticles";

interface ArticleListProps {
  username: string;
  showFavorited: boolean;
}

export const ProfileArticlesList: FC<ArticleListProps> = ({ username, showFavorited }) => {
  const {
    articles: myArticles,
    loading: loadingMyArticles,
    error: errorMyArticles,
  } = useArticles({ author: username });

  const {
    articles: favoritedArticles,
    loading: loadingFavoritedArticles,
    error: errorFavoritedArticles,
  } = useArticles({ favorited: username });

  const articles = showFavorited ? favoritedArticles : myArticles;
  const loading = showFavorited ? loadingFavoritedArticles : loadingMyArticles;
  const error = showFavorited ? errorFavoritedArticles : errorMyArticles;

  return (
    <>
      {loading ? (
        <p>Loading articles...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : articles.length ? (
        articles.map(article => <ArticlePreview article={article} key={article.slug} />)
      ) : (
        <p>No articles found.</p>
      )}
    </>
  );
};
