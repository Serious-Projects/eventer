import { useLayoutEffect, useState, useEffect } from 'react';
import { Navigate, useOutletContext, useNavigate } from 'react-router-dom';
// import useAuthStore from '../../context/AuthContext';
import { PrimaryButton, SecondaryButton } from '../../elements';
import { useAppContext, Actions } from '../../context/AppContext';

function Logout() {
   const { state, trigger } = useAppContext();
   const setLayoutData = useOutletContext();
   const navigate = useNavigate();
   
   useLayoutEffect(() => {
      setLayoutData((prev) => ({ title: 'Logout', icon: 'right-from-bracket' }));
   }, []);
   
   const logout = (e) => {
      trigger({ type: Actions.LOGOUT });
      navigate('/auth/login');
   };
   
   // Redirection...
   if (!state.sessionToken) return <Navigate to="/auth/login" />
   
   return (
      <section>
         <h2 className="text-2xl font-medium tracking-wide md:text-3xl">Ohh crap! You are leaving us {'🥲'}... Are you sure?</h2>
         <div className="flex flex-col mt-4 space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <PrimaryButton onClick={(e) => navigate('/')}>
               Naah! Just Kidding
            </PrimaryButton>
            <SecondaryButton onClick={logout}>
               Yes, Log Me Out
            </SecondaryButton>
         </div>
      </section>
   );
}

export default Logout;
