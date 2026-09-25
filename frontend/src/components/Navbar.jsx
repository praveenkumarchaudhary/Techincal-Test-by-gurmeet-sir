import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/profiles">All Profiles</Link>
            <Link to="/create-profile">Create Profile</Link>
        </nav>
    );
};

export default Navbar;
