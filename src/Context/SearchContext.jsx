import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({children}) =>{
    const [valueSearch, setValueSearch] = useState('');

    const obtenerValorDeBusqueda = (e) => {
        setValueSearch(e.target.value);
      };

    const data = {valueSearch, setValueSearch, obtenerValorDeBusqueda}

    return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>;
}

export {SearchProvider}
export default SearchContext