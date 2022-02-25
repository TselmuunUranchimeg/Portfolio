import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import background from "./images/Background.jpg";
import Homepage from "./Pages/Homepage/Homepage";
import Information from "./Pages/Information/Information";

function App() {
  return (
    <Router>
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
      <Routes>
        <Route path = "info/*" element = {<Information />} />
        <Route path = "/" element = {<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
