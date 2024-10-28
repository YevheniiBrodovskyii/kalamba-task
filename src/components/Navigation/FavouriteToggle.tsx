import { FC } from "react";
import { NavLink } from "react-router-dom";

interface ArticleToggleProps {
  showFavorited: boolean;
  username: string;
  onToggle: (showFavorited: boolean) => void;
}

export const FavouriteToggle: FC<ArticleToggleProps> = ({ showFavorited, onToggle, username }) => {
  const handleToggle = (isFavorited: boolean) => {
    if (showFavorited !== isFavorited) {
      onToggle(isFavorited);
    }
  };

  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink
            className={`nav-link ${!showFavorited ? "active" : ""}`}
            to={`/profile/${username}/my`}
            onClick={() => handleToggle(false)}
            aria-current={!showFavorited ? "page" : undefined}
          >
            My Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link ${showFavorited ? "active" : ""}`}
            to={`/profile/${username}/favorites`}
            onClick={() => handleToggle(true)}
            aria-current={showFavorited ? "page" : undefined} 
          >
            Favorited Articles
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
