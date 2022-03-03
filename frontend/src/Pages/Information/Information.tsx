import {
    useState, 
    useEffect, 
    MouseEvent, 
    Dispatch, 
    SetStateAction, 
    Suspense, 
    lazy 
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import "./Information.css";

interface SidebarOptionInterface {
    text: string;
    path: string;
    state: string;
    setState: Dispatch<SetStateAction<string>>
    className?: string;
}

const Character = lazy(() => import("./Character/Character"));
const Skills = lazy(() => import("./Skills/Skills"));
const Projects = lazy(() => import("./Projects/Projects"));
const Contact = lazy(() => import("./Contact/Contact"));

const SidebarOption = ({text, path, state, setState, className}: SidebarOptionInterface) => {
    const click = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
        let target = e.target as HTMLAnchorElement;
        setState(target.innerText);
    }

    return (
        <Link 
            to = {path} 
            className = {
                `${
                    state !== text ? "" : "bg-[#E39834]"
                } ${
                    text === "Character" ? "lg:border-t-[0px]" : ""
                } ${className}`
            }
            onClick = {(e) => click(e)}
        >
            {text}
        </Link>
    )
}

const LoadingInInfo = () => {
    return (
        <div className = "w-full h-full flex justify-center items-center content-center">
            <CircularProgress />
        </div>
    )
}

const Information = () => {
    const [state, setState] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        let urlTarget = window.location.pathname.substring(6);
        if (urlTarget[urlTarget.length-1] === "/") {
            urlTarget = urlTarget.substring(0, urlTarget.length-1);
        }
        urlTarget = `${urlTarget[0].toUpperCase()}${urlTarget.substring(1)}`
        setState(urlTarget);
    }, [state]);

    return (
        <div className = "information-container">
            <div className = "information">
                <div className = "information-header">
                    <h1 className = "mobile:text-2xl text-[#825B27] py-2 text-xl">
                        {window.innerWidth > 400 ? "Information" : "Info"}
                    </h1>
                    <CloseIcon onClick = {() => {navigate("/")}}/>
                </div>
                <div className = "information-bottom-half">
                    <div className = "information-option-list">
                        <SidebarOption 
                            path = "/info/character" 
                            text = "Character" 
                            state = {state}
                            setState = {setState}
                        />
                        <SidebarOption 
                            path = "/info/skills" 
                            text = "Skills" 
                            state = {state}
                            setState = {setState}
                        />
                        <SidebarOption 
                            path = "/info/projects" 
                            text = "Projects" 
                            state = {state}
                            setState = {setState}
                        />
                        <SidebarOption 
                            path = "/info/contact" 
                            text = "Contact" 
                            state = {state}
                            setState = {setState}
                            className = "lg:border-r-[1px] border-r-0"
                        />
                    </div>
                    <div className = "w-full div-container">
                        <Suspense fallback = {<LoadingInInfo />}>
                            <Routes>
                                <Route path = "character" element = {<Character />} />
                                <Route path = "skills" element = {<Skills />}/>
                                <Route path = "projects" element = {<Projects />} />
                                <Route path = "contact" element = {<Contact />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information;