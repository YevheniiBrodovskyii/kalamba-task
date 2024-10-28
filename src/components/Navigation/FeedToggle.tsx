import { useAuth } from "contexts/AuthContext";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { DisabledButton } from "components/ui";

interface FeedToggleProps {
  isGlobal: boolean;
  onToggle: (isGlobal: boolean) => void;
}

export const FeedToggle: FC<FeedToggleProps> = ({ isGlobal, onToggle }) => {
  const { user } = useAuth();

  const getNavLinkClass = (isActive: boolean) => (isActive ? "active" : "");

  const handleFeedToggle = (isGlobalFeed: boolean) => {
    if (isGlobal !== isGlobalFeed) {
      onToggle(isGlobalFeed);
    }
  };

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          {user ? (
            <NavLink
              className={`nav-link ${getNavLinkClass(!isGlobal)}`}
              to="/your-feed"
              onClick={() => handleFeedToggle(false)}
              aria-current={!isGlobal ? "page" : undefined}
            >
              Your Feed
            </NavLink>
          ) : (
            <DisabledButton text="Your Feed" />
          )}
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${getNavLinkClass(isGlobal)}`}
            to="/global-feed"
            onClick={() => handleFeedToggle(true)}
            aria-current={isGlobal ? "page" : undefined}
          >
            Global Feed
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
