import React from 'react';
import Navigation from '../components/Navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
function LayoutGeneral() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) {
            navigate("/");
        }else{
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
    }, [user]);
    return (
        <>
            <Navigation />
            <Aside />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default LayoutGeneral;