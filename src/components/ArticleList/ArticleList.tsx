import { FC, useState } from "react";
import { useArticles } from "../../hooks/useArticles";
import { ArticlePreview } from "./ArticlePreview";
import { Banner, ErrorMessage, FeedToggle, Loading, Sidebar } from "components";

export const ArticleList: FC = () => {
  const [isGlobalFeed, setIsGlobalFeed] = useState(true);
  const { articles, loading, error } = useArticles({ feed: !isGlobalFeed });

  //TODO: Make beautiful loader/ displaying error
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle isGlobal={isGlobalFeed} onToggle={setIsGlobalFeed} />

            {articles.map(article => (
              <ArticlePreview key={article.slug} article={article} />
            ))}
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
