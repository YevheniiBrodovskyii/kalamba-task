import { FC } from "react";

export const Sidebar: FC = () => {
  const tags = ["programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"];

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {tags.map(tag => (
          <a key={tag} href="" className="tag-pill tag-default">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};
