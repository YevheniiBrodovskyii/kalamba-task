import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

export const useRedirectToLogin = (): (() => boolean) => {
  const history = useHistory();
  const { user } = useAuth();

  const redirectToLogin = (): boolean => {
    if (!user) {
      history.push("/login");
      return true;
    }
    return false;
  };

  return redirectToLogin;
};
