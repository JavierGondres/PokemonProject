import { createContext, useState } from "react";

const GeneracionContext = createContext();

const initialGen = 1

const GeneracionProvider = ({children}) =>{
    const [generacion, setGeneracion] = useState(initialGen);


    const data = {generacion, setGeneracion}

    return <GeneracionContext.Provider value={data}>{children}</GeneracionContext.Provider>;
}

export {GeneracionProvider}
export default GeneracionContext