import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticle";
import { FC } from "react";
import { CommentsSection } from "components/CommentsSection";
import { ArticleActions } from "./ArticleActions";
import { Article as ArticleType } from "../../types";

export const Article: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug);
  console.log(article);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  const { title, body, createdAt, author, favoritesCount, following } = article as ArticleType;

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <ArticleActions createdAt={createdAt} author={author} favoritesCount={favoritesCount} following={following} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            {/* Convert Markdown to HTML */}
            {body}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleActions createdAt={createdAt} author={author} favoritesCount={favoritesCount} following={following} />
        </div>

        <CommentsSection />
      </div>
    </div>
  );
};
