import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessMessageProps {
  username: string;
  show: boolean;
}

interface ErrorMessageProps {
  error: string | null;
}

export const Loading: FC = () => <div>Loading...</div>;

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return <div className="error-messages">{error}</div>;
};

export const NoArticles: FC = () => <div>No article found.</div>;

export const SuccessMessage: FC<SuccessMessageProps> = ({ username, show }) => {
  if (!show) return null;

  return (
    <div className="success-message" style={{ color: "green", textAlign: "center", marginBottom: "20px" }}>
      <FaCheckCircle style={{ marginRight: "5px" }} />
      {`Login successful! Welcome, ${username}!`}
    </div>
  );
};
