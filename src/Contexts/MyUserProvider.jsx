import React, { useState, useEffect } from 'react';
import MyUser from './MyUser';
import axios from 'axios';

const MyUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserSaved , setIsUserSaved] = useState(false);
    

    //Logout
    const logout = async () =>
    {
        await axios.delete('/api/auth/logout',{},{withCredentials: true});
        // setUser(null);
        updateLogState(false);
        setIsUserSaved(false);
    }

    //Currently logged in user's information
    useEffect(() => {
        (async() => {
          try{
            const {data} = await axios.get('/api/users/showMe');
            setUser(data.user);
            updateLogState(true);
            setIsUserSaved(true);
          }catch{
            setUser(null);
            updateLogState(false);
          }

        })();
    }, [isLoggedIn]);

    const updateState = (newValue) => {
        setUser(newValue);
    }

    const updateLogState = (newValue) => {
        setIsLoggedIn(newValue);
    }

    return (
        <MyUser.Provider value={{ user, isLoggedIn, isUserSaved ,updateState, updateLogState, logout }}>
            {children}
        </MyUser.Provider>
    );
};

export default MyUserProvider;
