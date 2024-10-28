import { ArticlePreview } from "components/ArticleList/ArticlePreview";
import { FC, Fragment } from "react";
import { Loading, NoDataFoundMessage } from "components/ui";
import { Article } from "types";

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
}

export const ProfileArticlesList: FC<ArticleListProps> = ({ articles, loading }) => {

  const renderLoading = () => <Loading />;

  const renderArticles = () => {
    if (articles.length === 0) {
      return <NoDataFoundMessage />;
    }

    return articles.map(article => <ArticlePreview article={article} key={article.slug} />);
  };

  return (
    <Fragment>
      {loading ? renderLoading() : renderArticles()}
    </Fragment>
  );
};
