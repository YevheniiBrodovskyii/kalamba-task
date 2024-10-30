import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export const NotFoundPage: FC = () => {
    return (
        <div className="container" data-testid='not-found-page'>
            <div className="col-xs-12 col-md-8 offset-md-2" style={{ marginTop: '100px' }}>
                <h1 className="text-xs-center">404</h1>
                <p className="lead text-xs-center">Oops! Page not found.</p>
                <p className="lead text-xs-center">Sorry, the page you are looking for does not exist.</p>
                <div style={{ margin: '0 auto', width: '195px' }}>
                    <NavLink
                        className="btn btn-primary "
                        to="/your-feed"
                        aria-current="page"
                    >
                        <FaHome />
                        &nbsp; Return to home page
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
