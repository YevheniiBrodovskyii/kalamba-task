import { DisabledButton } from "components/ui";
import { useAuth } from "contexts/AuthContext";
import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      logout();
      navigate("/");
    } catch (err) {
      setError(`Failed to log out. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const renderNavLink = (to: string, text: string, icon?: JSX.Element) => (
    <NavLink
      className="nav-link"
      to={to}
      style={({ isActive }) => (isActive ? { color: 'black' } : undefined)}
    >
      {icon} {text}
    </NavLink>
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">conduit</a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {renderNavLink("/", "Home")}
          </li>
          <li className="nav-item">
            {user ? renderNavLink("/editor", "New Article", <i className="ion-compose" />) : <DisabledButton text="New Article" />}
          </li>
          <li className="nav-item">
            {user ? renderNavLink("/settings", "Settings", <i className="ion-gear-a" />) : <DisabledButton text="Settings" />}
          </li>
          {user ? (
            <li className="nav-item">
              <button
                className={`nav-link logout-button`}
                onClick={handleLogout}
                disabled={loading}
                aria-label="Logout"
              >
                {loading ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : "Logout"}
              </button>
              {error && <div className="error-messages">{error}</div>}
            </li>
          ) : (
            <>
              <li className="nav-item">
                {renderNavLink("/login", "Sign in")}
              </li>
              <li className="nav-item">
                {renderNavLink("/register", "Sign up")}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
