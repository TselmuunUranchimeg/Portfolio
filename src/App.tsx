import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import profile from "./assets/Profile.png";
import PastItem, { PastItemInterface } from "./components/Past";
import "./App.css";

const history: Array<PastItemInterface> = [
    {
        title: "2018 - Enrolled into BLCU",
        description: "First step into life after high school. In order to start my Bachelor's, it was mandatory to first learn the native language, Mandarin. It was definitely a memorable experience at Beiing Foreign Studies University.",
    },
    {
        title: "2019 - Bachelor's at BFSU",
        description: "Following my graduation from BLCU, it was time to start my bachelor studies at Beijing Foreing Studies University. Despite the pandemic robbing me of my university experience, I believe I made the most out of it, and greatly appreciate my professors and classmates."
    },
    {
        title: "2020 - Started diving into the world of tech",
        description: "Due to the free time provided by the pandemic, I decided to start learning Python since the professor of my IT class had to leave because of maternity leave. While foreign, I managed to understand the core fundamentals, and quickly started building small projects, such as a tik-tak-toe, a calculator. "
    },
    {
        title: "2021 - Journey to web development",
        description: "After studying how the different sectors of IT work, I decided to pursue a career in web development. Following the decision, I learnt more about front-end development, back-end development and NoSQL and SQL databases. "
    },
    {
        title: "2022 - Freelancing with fundamentals",
        description: "To further pursue a career in software development, I realised the fundamentals are there for a reason. The proceeding few months have been spent on studying how data strucutures and algorithms work along with code optimization techniques. Around the third quarter of the year, I took up a freelancing job, and it was definitely a good learning experience. Unfortunately, I had to quit as I had a thesis to write."
    }
];

function App() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.title = "Tselmuun's portfolio";
        if (window.matchMedia("(prefers-color-scheme: dark)").matches || localStorage.theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    }, []);

    const leaveMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="dark:text-white flex flex-col w-full box-border px-12 py-5 bg-white dark:bg-[#131313]">
                <div className="w-full flex justify-between mb-8">
                    <Link
                        to="/"
                        className="text-[#430297] font-semibold text-2xl dark:text-white"
                    >
                        Tselmuun
                    </Link>
                    <div 
                        className="h-[38px] w-[38px] bg-[#320073] dark:bg-[#f1a00a] rounded-md flex justify-center items-center shadow-[4px_4px_0_0_black] click active:shadow-[2px_2px_0_0_black] dark:shadow-[4px_4px_0_0_white] dark:active:shadow-[2px_2px_0_0_white] cursor-pointer"
                        onClick = {() => {
                            if (localStorage.theme === "dark") {
                                localStorage.theme = "light";
                                document.documentElement.classList.remove("dark");
                            } else {
                                localStorage.theme = "dark";
                                document.documentElement.classList.add("dark");
                            }
                            setDark(!dark);
                        }}
                    >
                        {
                            dark
                            ? <FontAwesomeIcon className = "text-white text-2xl" icon = {faSun} />
                            : <FontAwesomeIcon className = "text-white text-2xl" icon = {faMoon} />
                        }
                    </div>
                </div>
                <div className="w-full flex mb-8">
                    <div className="w-1/2 flex">
                        <img
                            src={profile}
                            alt="Profile picture"
                            className="w-3/5 min-w-[400px]"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between">
                        <div className="w-full">
                            <h1 className="font-bold text-3xl mb-5">
                                Hi, I am Tselmuun.
                            </h1>
                            <p className="w-2/3 min-w-[250px] dark:opacity-50">
                                I am a full stack developer who is passionate in
                                software development.
                            </p>
                        </div>
                        <div className="w-full flex flex-col">
                            <a
                                href = "#projects"
                                className="dark:shadow-white border-[1px] border-black dark:bg-[#934FEC] flex justify-center w-56 py-[6px] rounded-md mb-6 font-bold shadow-[4px_4px_0_0_rgb(67,2,151,100)] click active:shadow-[2px_2px_0_0_rgb(67,2,151,100)] "
                            >
                                Browse projects
                            </a>
                            <a
                                href = "#contact"
                                className="bg-[#934FEC] dark:bg-white dark:text-black dark:shadow-[4px_4px_0_0_rgb(67,2,151,100)] flex justify-center w-56 py-[6px] rounded-md text-white font-semibold shadow-[4px_4px_0_0_black] click active:shadow-[2px_2px_0_0_black]"
                            >
                                Contact me
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col mt-8">
                    <h1 className="text-center font-bold text-2xl mb-8">
                        Background
                    </h1>
                    <div className = "w-full flex flex-col items-center">
                        {history.map((val, ind) => {
                            return (
                                <PastItem
                                    key={ind}
                                    title={val.title}
                                    description={val.description}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className = "w-full flex flex-col">
                    <h1 
                        id = "projects"
                        className = "font-bold text-2xl text-center my-5"
                    >
                        Projects
                    </h1>
                    <p className = "text-center py-5 italic opacity-75">Coming soon...</p>
                </div>
                {/* Contact */}
                <div>
                    <h1 
                        id = "contact"
                        className = "text-2xl font-bold mb-4"
                    >
                        Contact
                    </h1>
                    <form 
                        className = "w-full flex flex-col items-start dark:text-black"
                        onSubmit = {async e => await leaveMessage(e)}
                    >
                        <input type = "email" placeholder = "Contact email" className = "input" required />
                        <input type = "text" placeholder = "Subject" className = "input" required />
                        <textarea rows = {5} className = "resize-none input" placeholder = "Message" required />
                        <button 
                            type = "submit"
                            className = "dark:shadow-[4px_4px_0_0_white] dark:active:shadow-[2px_2px_0_0_white] bg-[#934FEC] text-white px-4 py-2 font-semibold click rounded-md shadow-[4px_4px_0_0_black] active:shadow-[2px_2px_0_0_black]"
                        >
                            Leave a message
                        </button>
                    </form>
                </div>
                {/* Footer */}
                <div className = "w-full flex justify-center mt-3">
                    <a href = "https://github.com/TselmuunUranchimeg" target = "_blank">
                        <FontAwesomeIcon icon = {faGithub} className = "text-[28px] mr-4" />
                    </a>
                    <a href = "https://www.linkedin.com/in/tselmuun-uranchimeg-049a87249/" target = "_blank">
                        <FontAwesomeIcon icon = {faLinkedin} className = "text-[#0A66C2] text-[28px] ml-4" />
                    </a>
                </div>
            </div>
        </>
    );
}

export default App;
