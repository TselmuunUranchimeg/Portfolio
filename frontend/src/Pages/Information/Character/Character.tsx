import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Character.css";

const Character = () => {
    const [state, setState] = useState<boolean>(false);

    return (
        <div className = "w-full div-container">
            <div className = "character">
                <table className = "character-table">
                    <tbody>
                        <tr>
                            <td className = "character-field">Name</td>
                            <td className = "character-value">Tselmuun</td>
                        </tr>
                        <tr>
                            <td className = "character-field">Age</td>
                            <td className = "character-value">
                                {new Date().getFullYear() - 2001}
                            </td>
                        </tr>
                        <tr>
                            <td className = "character-field">Occupation</td>
                            <td className = "character-value">Student</td>
                        </tr>
                    </tbody>
                </table>
                <div 
                    className = {
                        `${
                            state ? "hidden" : "block"
                        } flex justify-center content-center items-center`
                    }
                >
                    <CircularProgress />
                </div>
                <img 
                    alt = "Profile" 
                    src = "https://pixelportfolio.herokuapp.com/api/images/profile.jpg"
                    className = {`animate-fadeIn ${state ? "block" : "hidden"}`}
                    onLoad = {() => setState(true)}
                />
            </div>
            <div className = "character-description">
                <h1>Description</h1>
                <p>
                    An aspiring full stack developer.
                    Although still a beginner, looking
                    forward to new challenges every day.
                </p>
            </div>
        </div>
    )
}

export default Character;