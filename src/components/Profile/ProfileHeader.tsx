import { Button } from "components/ui";
import { useFollowUser } from "hooks/useFollowUser";
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
  const handleFollowClick = () => {
    isFollowing ? unfollowUser(username) : followUser(username);
  };

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={image} alt={`${username}'s avatar`} className="user-img" />
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
