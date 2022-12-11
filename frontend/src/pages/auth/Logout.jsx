import { useLayoutEffect, useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import useAuthStore from '../../context/AuthContext';

function Logout() {
   const setLayoutData = useOutletContext();
   const { token, userLogout } = useAuthStore((state) => ({ token: state.token, userLogout: state.logoutUser }));
   const navigate = useNavigate();
   
   useLayoutEffect(() => {
      setLayoutData((prev) => ({ title: 'Logout', icon: 'right-from-bracket' }));
   }, []);
   
   useEffect(() => {
      if (!token) return navigate('/auth/login');
   }, []);
   
   const logout = (e) => {
      userLogout();
      navigate('/auth/login');
   };
   
   return (
      <section>
         <h2 className="tracking-wide md:text-2xl">Ohh crap! You are leaving us {'🥲'}... Are you sure?</h2>
         <div className="space-y-4 md:space-x-4">
            <button className="btn btn--primary" onClick={(e) => navigate('/')}>
               Naah! Just Kidding
            </button>
            <button className="btn border border-blue-500" onClick={logout}>
               Yes, Log Me Out
            </button>
         </div>
      </section>
   );
}

export default Logout;
