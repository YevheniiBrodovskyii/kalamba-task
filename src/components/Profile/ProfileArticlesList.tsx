import { ArticlePreview } from "components/ArticleList/ArticlePreview";
import { FC } from "react";
import { Article } from "types";

interface ArticleListProps {
  articles: Article[];
}

export const ProfileArticlesList: FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className="nav-link active" href="">
            My Articles
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">
            Favorited Articles
          </a>
        </li>
      </ul>

      {articles.length > 0 ? (
        articles.map(article => <ArticlePreview article={article} key={article.slug} />)
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};
