import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react"; // for top level parents if you don't want to render a html element no need for wrapping div
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import './navigation.styles.scss'

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    <Link className="nav-link" to="/auth">
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
