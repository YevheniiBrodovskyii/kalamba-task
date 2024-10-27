import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticle";
import { FC } from "react";
import { CommentsSection, ErrorMessage, Loading, NoDataFoundMessage } from "components";
import { ArticleActions } from "./ArticleActions";
import { Article as ArticleType } from "../../types";

export const Article: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug);

  //TODO: Make beautiful loader/ displaying error
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!article) return <NoDataFoundMessage />;

  const { title, body, createdAt, author, favoritesCount } = article as ArticleType;

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
          <div className="col-md-12">{body}</div>
        </div>

        <hr />

        <div className="article-actions">{articleActions}</div>

        <CommentsSection />
      </div>
    </div>
  );
};
