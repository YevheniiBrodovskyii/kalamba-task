import { FC } from "react";
import { useProfile } from "hooks/useProfile";
import { useParams } from "react-router-dom";
import { useArticles } from "hooks/useArticles";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileArticlesList } from "./ProfileArticlesList";

export const Profile: FC = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading: profileLoading, error: profileError } = useProfile(username);
  const { articles, loading: articlesLoading, error: articlesError } = useArticles({ author: username });

  //TODO: Make beautiful loader/ displaying error
  if (profileError) return <div>Error: {profileError}</div>;
  if (profileLoading) return <div>Loading profile...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="profile-page">
      <ProfileHeader profile={profile} />
      <div className="container">
        {articlesError ? (
          <div>Error loading articles: {articlesError}</div>
        ) : articlesLoading ? (
          <div>Loading articles...</div>
        ) : (
          <ProfileArticlesList articles={articles} />
        )}
      </div>
    </div>
  );
};
