import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export const useRedirectToLogin = (): (() => boolean) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const redirectToLogin = (): boolean => {
    if (!user) {
      navigate("/login");
      return true;
    }
    return false;
  };

  return redirectToLogin;
};
