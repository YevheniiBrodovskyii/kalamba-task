import { FC } from "react";
import { Author } from "types";

interface ArticleActionsProps {
  author: Author;
  createdAt: string;
  following: boolean;
  favoritesCount: number;
}

export const ArticleActions: FC<ArticleActionsProps> = ({ author, createdAt, following, favoritesCount }) => {
  return (
    <div className="article-meta">
      <a href={`/profile/${author.username}`}>
        <img src={author.image} alt={`${author.username}'s avatar`} />
      </a>
      <div className="info">
        <a href={`/profile/${author.username}`} className="author">
          {author.username}
        </a>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" />
        &nbsp; {following ? "Unfollow" : "Follow"} {author.username}
      </button>
      &nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart" />
        &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
      </button>
    </div>
  );
};
