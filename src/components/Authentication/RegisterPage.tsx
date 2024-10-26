import { FC } from "react";
import { Link } from "react-router-dom";

//TODO: Implement Registration functionality
export const RegisterPage: FC = () => {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Register</h1>

            <p className="text-xs-center">
              <Link to="/login">Already have an account? Sign in</Link>
            </p>
            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  aria-label="Username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  aria-label="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  aria-label="Password"
                />
              </fieldset>

              <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
