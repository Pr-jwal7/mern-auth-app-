
import { useState, useEffect } from "react";
import { createContext , useContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token,setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; // agr token hai toh true nhi toh false
  console.log("logged in " ,isLoggedIn);
  console.log(token);

  //tackling the logout functionality
  const LogoutUser = () =>{
    setToken(""); // set token ki value empty kr di
    return localStorage.removeItem("token");
  };

   // JWT AUTHENTICATION - to get the currently loggedIN user data
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers : {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data : ",data);
        setUser(data);
      } 
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };
    useEffect(() => {
      userAuthentication();
    }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS,LogoutUser,user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};