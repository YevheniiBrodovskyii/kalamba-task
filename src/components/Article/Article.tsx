import { Navigate, useParams } from "react-router-dom";
import { useArticle } from "hooks";
import { FC } from "react";
import { CommentsSection, Loading } from "components";
import { ArticleActions } from "./ArticleActions";
import { Article as ArticleType } from "../../types";
import Markdown from "markdown-to-jsx";

export const Article: FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { article, loading } = useArticle(slug);

  if (loading) return <Loading />;
  if (!article) return <Navigate to="/not-found" />;

  const { title, body, createdAt, author, favoritesCount } = article as ArticleType || {};

  const articleActions = (
    <ArticleActions createdAt={createdAt} author={author} favoritesCount={favoritesCount} slug={slug} />
  );

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          {articleActions}
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <Markdown>{body}</Markdown>
          </div>
        </div>

        <hr />

        <div className="article-actions">{articleActions}</div>

        <CommentsSection />
      </div>
    </div>
  );
};
