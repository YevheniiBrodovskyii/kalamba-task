import { Button } from "components/ui";
import { DEFAULT_AVATAR_URL } from "constants";
import { useFollowUser } from "hooks/useFollowUser";
import { useRedirectToLogin } from "hooks/useRedirectToLogin";
import { FC } from "react";
import { Author } from "types";

interface ProfileHeaderProps {
  profile: Author;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ profile }) => {
  const { username, image, bio } = profile;
  const {
    followUser,
    unfollowUser,
    isFollowing,
    isLoading: isFollowingUser,
    error: followError,
  } = useFollowUser(username);
  const redirectToLogin = useRedirectToLogin();

  const handleFollowClick = () => {
    redirectToLogin()
    return isFollowing ? unfollowUser(username) : followUser(username);
  };

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={image || DEFAULT_AVATAR_URL} alt={`${username}'s avatar`} className="user-img" />
            <h4>{username}</h4>
            <p>{bio}</p>
            <Button
              onClick={handleFollowClick}
              disabled={isFollowingUser}
              variant="outline-secondary"
              position="action-btn"
              icon={<i className="ion-plus-round" />}
            >
              &nbsp; {isFollowing ? `Unfollow ${username}` : `Follow ${username}`}
            </Button>
          </div>
        </div>
        {followError && <p className="error">{followError}</p>}
      </div>
    </div>
  );
};
