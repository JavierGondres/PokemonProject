import {React, useContext} from "react";
import {ChangeTheme} from "../Hooks/useTheme";
import ThemeContext from "../Context/ThemeContext";


function PokemonCard({id, name, urlImg, typeIndex, type, statM, statKg}) {
    const {theme, setTheme} = useContext(ThemeContext); 
    const tipos = []
    for (let index = 0; index < typeIndex; index++) {
        tipos.push(<p key={index} className={type[index].type.name}>{type[index].type.name}</p>)
    }

    let pokeId = id.toString()
    const getId = () =>{
        if(pokeId.length === 1){
            pokeId = '00' + pokeId
        }
        else if(pokeId.length === 2){
            pokeId = '0' + pokeId
        }
        return pokeId
    }


  return (
    <div className={`pokemon ${ChangeTheme(theme, 0)}`}>
      <p className= {`pokemon-id-back ${ChangeTheme(theme, 3)}`}>#{getId()}</p>
      <div className="pokemon-imagen">
        <img
          src={urlImg}
          alt=""
        />
      </div>
      <div className="pokemon-info">
        <div className="nombre-contenedor">
          <p className={`pokemon-id ${ChangeTheme(theme, 1)}`}>#{getId()}</p>
          <h2 className={`pokemon-nombre ${ChangeTheme(theme, 2)}`}>{name}</h2>
        </div>
        <div className="pokemon-tipos">
            {tipos}
        </div>
        <div className={`pokemon-stats`}>
          <p className={`stats  ${ChangeTheme(theme, 1)} `}>{statM}M</p>
          <p className={`stats   ${ChangeTheme(theme, 1)} `}>{statKg}Kg</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
