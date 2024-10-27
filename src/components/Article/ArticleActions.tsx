import { FC } from "react";
import { Author } from "types";
import { Link } from "react-router-dom";
import { useFavoritePost } from "hooks/useFavoritePost";
import { useFollowUser } from "hooks/useFollowUser";
import { Button } from "components";
import { useRedirectToLogin } from "hooks/useRedirectToLogin";

interface ArticleActionsProps {
  author: Author;
  createdAt: string;
  favoritesCount: number;
  slug: string;
}

export const ArticleActions: FC<ArticleActionsProps> = ({ author, createdAt, slug }) => {
  const {
    favoritePost,
    unfavoritePost,
    isFavorited,
    favoritesCount,
    isLoading: isFavoriting,
    error: favoriteError,
  } = useFavoritePost(slug);
  const {
    followUser,
    unfollowUser,
    isFollowing,
    isLoading: isFollowingUser,
    error: followError,
  } = useFollowUser(author.username);
  const redirectToLogin = useRedirectToLogin();

  const handleFavoriteClick = () => {
    redirectToLogin()
    return isFavorited ? unfavoritePost(slug) : favoritePost(slug);
  };

  const handleFollowClick = () => {
    redirectToLogin()
    return isFollowing ? unfollowUser(author.username) : followUser(author.username);
  };

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={author.image} alt={`${author.username}'s avatar`} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <Button
        variant="outline-secondary"
        onClick={handleFollowClick}
        disabled={isFollowingUser}
        icon={<i className="ion-plus-round" />}
      >
        &nbsp; {isFollowing ? "Unfollow" : "Follow"} {author.username}
      </Button>
      &nbsp;
      <Button
        variant="outline-primary"
        onClick={handleFavoriteClick}
        disabled={isFavoriting}
        icon={<i className="ion-heart" />}
      >
        &nbsp; {isFavorited ? "Unfavorite" : "Favorite"} Post <span className="counter">({favoritesCount})</span>
      </Button>
      {favoriteError && <p className="error">{favoriteError}</p>}
      {followError && <p className="error">{followError}</p>}
    </div>
  );
};
