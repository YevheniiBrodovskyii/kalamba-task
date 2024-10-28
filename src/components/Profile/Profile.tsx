import { FC, useState } from "react";
import { useProfile, useArticles } from "hooks";
import { Navigate, useParams } from "react-router-dom";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileArticlesList } from "./ProfileArticlesList";
import { Loading, NoDataFoundMessage } from "components/ui";
import { FavouriteToggle } from "components/Navigation";

export const Profile: FC = () => {
  const { username = '' } = useParams<{ username: string }>();
  const { profile, loading: profileLoading } = useProfile(username);
  const [showFavorited, setShowFavorited] = useState<boolean>(false);
  const { articles, loading: articlesLoading } = useArticles({
    author: showFavorited ? undefined : username,
    favorited: showFavorited ? username : undefined,
  });

  if (!profileLoading && profile === null) {
    return <Navigate to="/not-found" />;
  }

  const renderContent = () => {
    if (profileLoading || articlesLoading) {
      return <Loading />;
    }

    return (
      <>
        {profile && <ProfileHeader profile={profile} />}
        <div className="container">
          <FavouriteToggle showFavorited={showFavorited} onToggle={setShowFavorited} username={username} />
          {articles.length === 0 ? <NoDataFoundMessage /> : <ProfileArticlesList articles={articles} loading={articlesLoading} />}
        </div>
      </>
    );
  };

  return <div className="profile-page">{renderContent()}</div>;
};