import { FC } from "react";
import { Link } from "react-router-dom";

interface ArticleToggleProps {
  showFavorited: boolean;
  onToggle: (showFavorited: boolean) => void;
}

export const FavouriteToggle: FC<ArticleToggleProps> = ({ showFavorited, onToggle }) => (
  <div className="articles-toggle">
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link className={`nav-link ${!showFavorited ? "active" : ""}`} to="#" onClick={() => onToggle(false)}>
          My Articles
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${showFavorited ? "active" : ""}`} to="#" onClick={() => onToggle(true)}>
          Favorited Articles
        </Link>
      </li>
    </ul>
  </div>
);
