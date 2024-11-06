import {useContext,createContext } from "react";
import {getAuth,setAuth,clearAuth} from  "./localStorage"
const authContext=createContext({})

export const AuthProvider=({children})=>{
    return (
        <authContext.Provider value={{getAuth,setAuth,clearAuth}}>
        {children}
       </authContext.Provider>
   )
}
export const useAuth = () => {
    return useContext(authContext);
}
// export default authContext