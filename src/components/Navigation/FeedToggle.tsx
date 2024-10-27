import { FC } from "react";
import { Link } from "react-router-dom";

interface FeedToggleProps {
  isGlobal: boolean;
  onToggle: (isGlobal: boolean) => void;
}

export const FeedToggle: FC<FeedToggleProps> = ({ isGlobal, onToggle }) => (
  <div className="feed-toggle">
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link className={`nav-link ${!isGlobal ? "active" : ""}`} to="/your-feed" onClick={() => onToggle(false)}>
          Your Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${isGlobal ? "active" : ""}`} to="/global-feed" onClick={() => onToggle(true)}>
          Global Feed
        </Link>
      </li>
    </ul>
  </div>
);
