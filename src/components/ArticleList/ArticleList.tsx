import { FC, useState } from "react";
import { useArticles } from "hooks";
import { ArticlePreview } from "./ArticlePreview";
import { Banner, FeedToggle, Loading, NoDataFoundMessage, Sidebar } from "components";

export const ArticleList: FC = () => {
  const [isGlobalFeed, setIsGlobalFeed] = useState(true);
  const { articles, loading } = useArticles({ feed: !isGlobalFeed });
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