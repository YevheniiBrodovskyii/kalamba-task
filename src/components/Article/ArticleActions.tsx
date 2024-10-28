import { FC, useEffect } from "react";
import { Author } from "types";
import { Link } from "react-router-dom";
import { useFavoritePost } from "hooks/useFavoritePost";
import { useFollowUser } from "hooks/useFollowUser";
import { Button, showErrorNotification } from "components";
import { useRedirectToLogin } from "hooks/useRedirectToLogin";
import { DEFAULT_AVATAR_URL } from "constants";

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

  const handleActionClick = (action: (arg: string) => Promise<void>, arg: string) => {
    redirectToLogin();
    action(arg);
  };

  const handleFavoriteClick = () => handleActionClick(isFavorited ? unfavoritePost : favoritePost, slug);
  const handleFollowClick = () => handleActionClick(isFollowing ? unfollowUser : followUser, author.username);

  useEffect(() => {
    if (followError) showErrorNotification(followError);
    if (favoriteError) showErrorNotification(favoriteError);
  }, [followError, favoriteError]);

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={author.image || DEFAULT_AVATAR_URL} alt={`${author.username || "User"}'s avatar`} />
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
    </div>
  );
};
