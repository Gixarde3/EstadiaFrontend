import React from 'react';
import Navigation from '../components/Navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
import { Tooltip } from 'react-tooltip';
import { OptionsContextProvider } from '../contexts/OptionsContext';
import { useLocation } from 'react-router-dom';

function LayoutGeneral() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(user){
            if(location.pathname === "/home"){
                if(user.privilege === 1){
                    navigate("alumno");
                }
                if(user.privilege === 2){
                    navigate("profesor");
                }
                if(user.privilege === 3){
                    navigate("director");
                }
            }
        }else{
            navigate("/");
        }
    });
    return (
        <>
        {
            user && (
                <OptionsContextProvider>
                    <Navigation />
                    <Aside />
                    <main id="layout">
                        <Outlet />
                    </main> 
                    <Tooltip id="tooltip"/>
                </OptionsContextProvider>
            )
        }
        </>
    );
}

export default LayoutGeneral;