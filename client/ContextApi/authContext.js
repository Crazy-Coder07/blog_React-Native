import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Context 
const AuthContext = createContext();

// Provider
const AuthProvider = ({children}) => {
    // global state
    const [state, setState] = useState({
        user: null,
        token: "",
    });
   
    // default axios settings
    axios.defaults.headers.common["Authorization"]=`Bearer ${state.token}`;
    axios.defaults.baseURL="http://10.0.0.80:8080/api/v1"
    // inital local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem("@auth");
            let logindata = JSON.parse(data);
            setState({ ...state, user: logindata?.user, token: logindata?.token });
        }
        loadLocalStorageData();
    }, []);
    
    return(
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext,AuthProvider}
