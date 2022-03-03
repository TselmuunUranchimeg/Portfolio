import { Suspense, lazy} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import background from "./images/Background.jpg";

const LoadingScreen = () => {
  return (
    <div className = "w-screen h-screen flex justify-center content-center items-center">
      <CircularProgress />
    </div>
  )
}

const Home = lazy(() => import("./Pages/Homepage/Homepage"));
const Info = lazy(() => import("./Pages/Information/Information"));

function App() {
  return (
    <Suspense fallback = {<LoadingScreen />}>
      <div className = {`animate-fadeIn`}>
        <img 
          src = {background}
          alt = "RPG Field"
          className = "w-screen h-screen absolute object-cover"
        />
        <a
          target = "_blank"
          href='https://www.freepik.com/stockgiu'
          className = "absolute right-0 text-black/60 z-20 text-xs lg:text-base"
          rel = "noopener noreferrer"
        >
          Background image created by stockgiu - www.freepik.com
        </a>
        <Router>
          <Suspense fallback = {<LoadingScreen />}>
            <Routes>
              <Route path = "info/*" element = {<Info />} />
              <Route path = "/" element = {<Home />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </Suspense>
  )
}

export default App;
