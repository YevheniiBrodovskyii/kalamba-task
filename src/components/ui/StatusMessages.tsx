import { FC } from "react";
import { Puff } from "react-loader-spinner";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";

interface SuccessMessageProps {
  username: string;
  show: boolean;
}

export const Loading: FC = () => (
  <div className="loading-container">
    <Puff height="150" width="150" color="#5cb85c" ariaLabel="loading" />
    <p className="loading-message">Please wait</p>
  </div>
);

export const showErrorNotification = (error: string) => {
  toast.error(
    <div className="error-notification">
      {error}
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    }
  );
};

export const NoDataFoundMessage: FC = () => (
  <div className="alert alert-warning no-data-message" role="alert">
    <FaExclamationTriangle />
    <p className="loading-message">No data found</p>
  </div>
);

export const SuccessMessage: FC<SuccessMessageProps> = ({ username, show }) => {
  if (!show) return null;

  return (
    <div className="alert alert-success success-message" role="alert">
      <FaCheckCircle style={{ marginRight: '2px' }} />
      <p className="loading-message">{`Login successful! Welcome, ${username}!`}</p>
    </div>
  );
};

export const showSuccessNotification = (message: string) => {
  toast.success(
    <div className="success-notification">
      {message}
    </div>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    }
  );
};
