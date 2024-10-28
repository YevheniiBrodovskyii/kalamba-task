import { FC, Fragment } from "react";
import { Author } from "types";
import { Link } from "react-router-dom";
import { useFavoritePost, useActionHandler, useFollowUser } from "hooks";
import { Button } from "components";
import { DEFAULT_AVATAR_URL } from "constants";

interface ArticleActionsProps {
  author: Author;
  createdAt: string;
  favoritesCount: number;
  slug: string;
}

//TODO: Automatically update articles after like/follow
export const ArticleActions: FC<ArticleActionsProps> = ({ author, createdAt, slug }) => {
  const {
    toggleFavorite,
    isFavorited,
    favoritesCount,
    isLoading: isFavoriting,
  } = useFavoritePost(slug);
  const {
    toggleFollow,
    isFollowing,
    isLoading: isFollowingUser,
  } = useFollowUser(author.username);
  const { handleActionClick } = useActionHandler();

  const handleFavoriteClick = () => handleActionClick(
    () => toggleFavorite(!isFavorited),
    slug,
  );

  const handleFollowClick = () => handleActionClick(
    () => toggleFollow(!isFollowing),
    author.username,
  );

  return (
    <div className="article-meta article-wrapper">
      <Link to={`/profile/${author.username}`}>
        <img src={author.image || DEFAULT_AVATAR_URL} alt={`${author.username || "User"}'s avatar`} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <Fragment>
        <Button
          variant="outline-secondary"
          onClick={handleFollowClick}
          disabled={isFollowingUser}
          icon={<i className="ion-plus-round" />}
        >
          {isFollowing ? " Unfollow" : " Follow"} {author.username}
        </Button>
        <Button
          variant="outline-primary"
          onClick={handleFavoriteClick}
          disabled={isFavoriting}
          icon={<i className="ion-heart" />}
        >
          {isFavorited ? " Unfavorite" : " Favorite"} Post <span className="counter">({favoritesCount})</span>
        </Button>
      </Fragment>
    </div>
  );
};