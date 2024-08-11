import React from 'react';
import Navigation from '../components/Navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
import { Tooltip } from 'react-tooltip';
function LayoutGeneral() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(user){
            console.log("Hay usuario", user);
            if(user.privilege === 1){
                navigate("alumno");
            }
            if(user.privilege === 2){
                navigate("profesor");
            }
            if(user.privilege === 3){
                navigate("director");
            }
        }else{
            navigate("/");
        }
    }, [user]);
    return (
        <>
        {
            user && (
                <>
                    <Navigation />
                    <Aside />
                    <main>
                        <Outlet />
                    </main> 
                    <Tooltip id="tooltip"/>
                </>
            )
        }
        </>
    );
}

export default LayoutGeneral;