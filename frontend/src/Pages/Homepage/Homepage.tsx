import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
    return (
        <div className = "homepage">
            <h1>Welcome to my RPG based pixel portfolio</h1>
            <Link to = "/info/character">
                View details
            </Link>
        </div>
    )
}

export default Homepage;