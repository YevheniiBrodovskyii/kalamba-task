import { Button } from "components/ui";
import { DEFAULT_AVATAR_URL } from "constants";
import { useActionHandler, useFollowUser } from "hooks";
import { FC } from "react";
import { Author } from "types";

interface ProfileHeaderProps {
  profile: Author;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ profile }) => {
  const { username, image, bio } = profile;
  const {
    toggleFollow,
    isFollowing,
    isLoading: isFollowingUser,
  } = useFollowUser(username);
  const { handleActionClick } = useActionHandler();

  const handleFollowClick = () => {
    handleActionClick(
      () => toggleFollow(!isFollowing),
      username,
    );
  };

  const renderFollowButton = () => (
    <Button
      onClick={handleFollowClick}
      disabled={isFollowingUser}
      variant="outline-secondary"
      position="action-btn"
      icon={<i className="ion-plus-round" />}
    >
      &nbsp; {isFollowing ? `Unfollow ${username}` : `Follow ${username}`}
    </Button>
  );




  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={image || DEFAULT_AVATAR_URL} alt={`${username}'s avatar`} className="user-img" />
            <h4>{username}</h4>
            <p>{bio}</p>
            {renderFollowButton()}
          </div>
        </div>
      </div>
    </div>
  );
};
