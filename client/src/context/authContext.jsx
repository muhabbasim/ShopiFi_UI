import { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  // get users from localStorage if exixts
  const [ currentUser, setCurrentUser ] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
 
  // get the login axios from the login page
  const login = async (formData) => {
    const res = await axios.post("http://localhost:3000/api/auth/login", formData,{
      withCredentials: true
    })
    console.log(res.data)
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.get("http://localhost:3000/api/auth/logout")
    setCurrentUser("")
  }

  useEffect(()=> {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

