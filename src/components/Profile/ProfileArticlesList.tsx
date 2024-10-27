import { ArticlePreview } from "components/ArticleList/ArticlePreview";
import { FC, useState } from "react";
import { useArticles } from "hooks/useArticles";
import { FavouriteToggle } from "components";

interface ArticleListProps {
  username: string;
}

export const ProfileArticlesList: FC<ArticleListProps> = ({ username }) => {
  const [showFavorited, setShowFavorited] = useState<boolean>(false);

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
      <FavouriteToggle showFavorited={showFavorited} onToggle={setShowFavorited} />

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
