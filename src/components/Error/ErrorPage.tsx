import { NavLink } from "react-router-dom";
import '../../App.css';
import './ErrorPage.css';

export default function ErrorPage() {
    return (
        <div className="error-container">
            <h1 className="mt-0 mb-0 error-title">Page Not Found</h1>
            <p className="mt-48 error-description">Looks like you've followd a broken link or entered a URL that doesn't exist on this site.</p>
            <NavLink className="error-link" to={"/"}>&larr; Back to our site</NavLink>
        </div>
    )
}
