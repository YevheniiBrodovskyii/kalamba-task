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
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          {user ? (
            <NavLink
              className={`nav-link ${!isGlobal ? "active" : ""}`}
              to="/your-feed"
              onClick={() => onToggle(false)}
            >
              Your Feed
            </NavLink>
          ) : (
            <DisabledButton text="Your Feed"/>
          )}
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${isGlobal ? "active" : ""}`} to="/global-feed" onClick={() => onToggle(true)}>
            Global Feed
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
