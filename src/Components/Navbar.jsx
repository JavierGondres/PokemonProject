import React, { useContext, useState, useRef, useEffect } from "react";
import { navItems } from "../navItemsData";
import usePokeType from "../Hooks/usePokeType";
import { BsSearch } from "react-icons/bs";
import SearchContext from "../Context/SearchContext";
import GeneracionContext from "../Context/GeneracionContext";
import { generacionData } from "../generacionData";
import ThemeContext from "../Context/ThemeContext";
import {ChangeTheme} from "../Hooks/useTheme";
import {BsFillSunFill} from 'react-icons/bs'
import {BsMoonStarsFill} from 'react-icons/bs'

function Navbar() {
  const { type, setType } = usePokeType();
  const { obtenerValorDeBusqueda } = useContext(SearchContext);
  const {generacion, setGeneracion} = useContext(GeneracionContext)
  const {theme, setTheme} = useContext(ThemeContext);
  const [openInput, setOpenInput] = useState(false);
  const refInput = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (refInput.current && !refInput.current.contains(event.target)) {
        setOpenInput(false);
      } else setOpenInput(true);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`${ChangeTheme(theme, 0)} ${ChangeTheme(theme, 2)}`}>
      <nav className="nav">
        <div className="searchBarWrapper">
          <img src="../logo.png" alt="" />
          <div ref={refInput} className="searchContainer">
            <label htmlFor="search">
              Search <BsSearch className="lupa" />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              onChange={obtenerValorDeBusqueda}
              className={`input ${ChangeTheme(theme, 4)}  ${openInput ? "open" : ""}`}
            />
          </div>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <button
              className="btn btn-header"
              id="ver-todos"
              onClick={(e) => setType(() => e.target.id)}
            >
              Ver todos
            </button>
          </li>
          {navItems.map(({ type }, key) => (
            <li key={key} className="nav-item">
              <button
                className={`btn btn-header ${type}`}
                id={type}
                onClick={(e) => setType(() => e.target.id)}
              >
                {type}
              </button>
            </li>
          ))}
          <div className={`generacion-container `}>
            <label style={{color: '#1c1c1c'}} htmlFor="generacion">Generacion Pokemon</label>
            <select name="generacion"  id='generacion'onChange={(e) => setGeneracion(e.target.value)}>
              {generacionData.map((gen, key) => {
                return <option key={key} value={key}>{key + 1}</option>
              })}
          </select>
          </div>
        <button className={`btn btn-header  ${theme ? 'apagado': 'encendido'}`} onClick={() => setTheme((prev) => !prev)}>
          
          {theme ? <BsFillSunFill className="sun"/> : <BsMoonStarsFill className="moon"/> }
          
        </button>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
