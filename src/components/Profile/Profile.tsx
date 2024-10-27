import { FC, useState } from "react";
import { useProfile } from "hooks/useProfile";
import { useParams } from "react-router-dom";
import { useArticles } from "hooks/useArticles";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileArticlesList } from "./ProfileArticlesList";
import { ErrorMessage, Loading, NoDataFoundMessage } from "components/ui";
import { FavouriteToggle } from "components/Navigation";

export const Profile: FC = () => {
  const { username = '' } = useParams<{ username: string }>();
  const { profile, loading: profileLoading, error: profileError } = useProfile(username);
  const { articles, loading: articlesLoading, error: articlesError } = useArticles({ author: username });
  const [showFavorited, setShowFavorited] = useState<boolean>(false);

  const renderProfileContent = () => {
    //TODO: Make beautiful loader/ displaying error
    if (profileError) return <ErrorMessage error={profileError} />;
    if (profileLoading) return <Loading />;
    if (!profile) return <NoDataFoundMessage />;

    return (
      <>
        <ProfileHeader profile={profile} />
        <div className="container">
          <FavouriteToggle showFavorited={showFavorited} onToggle={setShowFavorited} username={username} />

          {renderArticlesContent()}
        </div>
      </>
    );
  };

  const renderArticlesContent = () => {
    if (articlesError) return <ErrorMessage error={articlesError} />;
    if (articlesLoading) return <Loading />;
    if (articles.length === 0) return <NoDataFoundMessage />;

    return <ProfileArticlesList username={username} showFavorited={showFavorited} />;
  };

  return <div className="profile-page">{renderProfileContent()}</div>;
};
