import { FC } from "react";
import { Article } from "types";

export const ArticlePreview: FC<{ article: Article }> = ({ article }) => (
  <div className="article-preview">
    <div className="article-meta">
      <a href={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt={`${article.author.username}'s avatar`} />
      </a>
      <div className="info">
        <a href={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </a>
        <span className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart" /> {article.favoritesCount}
      </button>
    </div>
    <a href={`/article/${article.title}`} className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
    </a>
  </div>
);
