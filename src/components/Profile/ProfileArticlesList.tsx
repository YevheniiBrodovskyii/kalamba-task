import { ArticlePreview } from "components/ArticleList/ArticlePreview";
import { FC, useEffect } from "react";
import { useArticles } from "hooks/useArticles";
import { showErrorNotification, Loading, NoDataFoundMessage } from "components/ui";

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

  const renderLoading = () => <Loading />;

  useEffect(() => {
    if (error) {
      showErrorNotification(error);
    }
  }, [error]);

  const renderArticles = () => {
    if (articles.length === 0) {
      return <NoDataFoundMessage />;
    }

    return articles.map(article => <ArticlePreview article={article} key={article.slug} />);
  };

  return (
    <>
      {loading ? renderLoading() : renderArticles()}
    </>
  );
};
