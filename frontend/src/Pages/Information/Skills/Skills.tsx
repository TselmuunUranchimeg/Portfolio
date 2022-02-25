import "./Skills.css";

interface SkillsInterface {
    skill: string;
    length: string;
}

const Skills = () => {
    const firstPart: Array<SkillsInterface> = [
        { skill: "HTML&CSS", length: "w-html" },
        { skill: "Golang", length: "w-go" },
        { skill: "JS(Node.js)", length: "w-node" },
        { skill: "C#(.NET)", length: "w-csharp" },
        { skill: "Python", length: "w-python" },
    ];

    return (
        <div className = "skills div-container">
            <div>
                {firstPart.map((value, index) => {
                    return (
                        <div className = "skill" key = {index}>
                            <div className = "skill-header">
                                <h1>{value.skill}</h1>
                            </div>
                            <div className = "skill-bar">
                                <div className = {`h-full ${value.length}`}>
                                    <div className = "bg-orange-500 h-full animate-extend">

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className = "specialty">
                <h1>Specialty</h1>
                <ul>
                    <li>Front-end web development</li>
                    <li>Back-end web development</li>
                </ul>
            </div>
        </div>
    )
}

export default Skills;