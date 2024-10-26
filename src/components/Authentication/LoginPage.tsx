import { useAuth } from "contexts/AuthContext";
import { FC, useEffect, useState, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

export const LoginPage: FC = () => {
  const { user, login, loading, error } = useAuth();
  const [formData, setFormData] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(formData.email, formData.password);
  };

  useEffect(() => {
    if (user) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        history.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, history]);

  const renderErrorMessage = useCallback(() => {
    if (error) {
      return (
        <ul className="error-messages">
          <li>{error}</li>
        </ul>
      );
    }
    return null;
  }, [error]);

  const renderSuccessMessage = useCallback(() => {
    if (showSuccessMessage && user) {
      return (
        <div className="success-message" style={{ color: "green", textAlign: "center", marginBottom: "20px" }}>
          <FaCheckCircle style={{ marginRight: "5px" }} />
          {`Login successful! Welcome, ${user.username}!`}
        </div>
      );
    }
    return null;
  }, [showSuccessMessage, user]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="/register">Do not have an account? Sign up</Link>
            </p>

            {renderErrorMessage()}
            {renderSuccessMessage()}

            {!user && (
              <form onSubmit={handleLogin}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                    aria-label="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    aria-label="Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
