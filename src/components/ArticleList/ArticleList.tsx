import { FC, useEffect, useState } from "react";
import { useArticles } from "../../hooks/useArticles";
import { ArticlePreview } from "./ArticlePreview";
import { Banner, showErrorNotification, FeedToggle, Loading, NoDataFoundMessage, Sidebar } from "components";

export const ArticleList: FC = () => {
  const [isGlobalFeed, setIsGlobalFeed] = useState(true);
  const { articles, loading, error } = useArticles({ feed: !isGlobalFeed });

  useEffect(() => {
    if (error) {
      showErrorNotification(error);
    }
  }, [error]);

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle isGlobal={isGlobalFeed} onToggle={setIsGlobalFeed} />

            {loading ? (
              <Loading />
            ) : !articles || articles.length === 0 ? (
              <NoDataFoundMessage />
            ) : (
              articles.map(article => (
                <ArticlePreview key={article.slug} article={article} />
              ))
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