import profile from "../../../images/Profile.jpg";
import "./Character.css";

const Character = () => {
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
                <img alt = "Profile" src = {profile} className = "animate-fadeIn" />
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