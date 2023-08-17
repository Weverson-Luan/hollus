/**
 * IMPORTS
 */
 import { useContext } from "react";
 import { AuthContext } from "../../AuthProvider";
 
 
 const useProducts = () => {
   const context = useContext(AuthContext);
 
   return context;
 };
 
 /**
  * EXPORTS
  */
 export { useProducts };