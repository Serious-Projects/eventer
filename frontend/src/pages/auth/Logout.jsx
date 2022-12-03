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
         <div className="mt-5 flex flex-col space-y-4 md:space-x-4 md:flex-row">
            <button className="w-fill bg-blue-300 py-2 px-4 rounded text-blue-900" onClick={(e) => navigate('/')}>
               Naah! Just Kidding
            </button>
            <button className="w-fill border border-blue-500 py-2 px-4 rounded" onClick={logout}>
               Yes, Log Me Out
            </button>
         </div>
      </section>
   );
}

export default Logout;
