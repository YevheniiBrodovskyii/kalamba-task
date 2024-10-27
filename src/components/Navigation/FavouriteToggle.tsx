import { FC } from "react";
import { NavLink } from "react-router-dom";

interface ArticleToggleProps {
  showFavorited: boolean;
  username: string;
  onToggle: (showFavorited: boolean) => void;
}

export const FavouriteToggle: FC<ArticleToggleProps> = ({ showFavorited, onToggle, username }) => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink
            className={`nav-link ${!showFavorited ? "active" : ""}`}
            to={`/profile/${username}/my`}
            onClick={() => onToggle(false)}
          >
            My Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${showFavorited ? "active" : ""}`}
            to={`/profile/${username}/favorites`}
            onClick={() => onToggle(true)}
          >
            Favorited Articles
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
