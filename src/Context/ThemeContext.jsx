import { createContext, useState } from "react";

 const ThemeContext = createContext();

 const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useState();
    const data = {theme, setTheme}

    return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
 }

export {ThemeProvider}
export default ThemeContext