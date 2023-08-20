import {React, useRef} from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import Main from "./Components/Main";
import UserContext from "./Context/UserContext";
import { useState } from "react";
import SearchContext from "./Context/SearchContext";
import GeneracionContext from "./Context/GeneracionContext";
import ThemeContext from "./Context/ThemeContext";
import { ChangeTheme } from "./Hooks/useTheme";

function App() {
  const [type, setType] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [generacion, setGeneracion] = useState(0);
  const [ theme, setTheme ] = useState(false);
  const obtenerValorDeBusqueda = (e) => {
    setValueSearch(e.target.value);
  };

  {theme? document.body.classList.add('secondary' ,'white') : document.body.classList.remove('secondary','white')  }

  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <GeneracionContext.Provider value={{ generacion, setGeneracion }}>
          <UserContext.Provider value={{ type, setType }}>
            <SearchContext.Provider
              value={{ valueSearch, setValueSearch, obtenerValorDeBusqueda }}
            >
              <Navbar></Navbar>
              <Main></Main>
            </SearchContext.Provider>
          </UserContext.Provider>
        </GeneracionContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
