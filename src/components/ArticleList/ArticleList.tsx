import { FC } from "react";
import { useArticles } from "../../hooks/useArticles";
import { ArticlePreview } from "./ArticlePreview";
import { Banner, FeedToggle, Sidebar } from "components";

export const ArticleList: FC = () => {
  const { articles, error } = useArticles();

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle />
            {error ? (
              <div className="error-message">Error: {error}</div>
            ) : (
              articles.map(article => <ArticlePreview key={article.slug} article={article} />)
            )}
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
