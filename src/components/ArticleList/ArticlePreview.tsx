import { FC, useMemo } from "react";
import { Article } from "types";
import { Link } from "react-router-dom";
import { useFavoritePost, useActionHandler } from "hooks";
import { Button } from "components/ui";
import { DEFAULT_AVATAR_URL } from "constants";


export const ArticlePreview: FC<{ article: Article }> = ({ article }) => {
  const { slug, title, description, createdAt, author } = article;
  const { username: authorUsername, image: authorImage } = author;
  const {
    toggleFavorite,
    isFavorited,
    favoritesCount,
    isLoading: isFavoriting,
  } = useFavoritePost(slug);
  const { handleActionClick } = useActionHandler();
  const formattedDate = useMemo(() => new Date(createdAt).toLocaleDateString(), [createdAt]);

  const handleFavoriteClick = () => {
    handleActionClick(
      () => toggleFavorite(!isFavorited),
      slug,
    );
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        {authorUsername && (
          <>
            <Link to={`/profile/${authorUsername}`}>
              <img src={authorImage || DEFAULT_AVATAR_URL} alt={`${authorUsername}'s avatar`} />
            </Link>
            <div className="info">
              <Link to={`/profile/${authorUsername}`} className="author">
                {authorUsername}
              </Link>
              <span className="date">{formattedDate}</span>
            </div>
          </>
        )}

        <Button
          onClick={handleFavoriteClick}
          disabled={isFavoriting}
          variant="outline-primary"
          position="pull-xs-right"
          icon={<i className="ion-heart" />}
        >
          {" "}
          {favoritesCount}
        </Button>
      </div>
      <Link to={`/articles/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};
