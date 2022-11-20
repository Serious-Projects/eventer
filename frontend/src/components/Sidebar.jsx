import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../data';

function Sidebar({ isOpen, setIsOpen }) {
   return (
      <aside className={`fixed top-14 left-0 w-64 min-h-screen bg-white-200 backdrop-blur ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition ease-in-out duration-500 z-50`}>
         <button
            type="button"
            className="w-8 h-8 ml-auto mt-3 mr-3 flex justify-center items-center border border-black rounded"
            onClick={(e) => setIsOpen(false)}
         >
            <i className="fa-solid fa-xmark text-xl"></i>
         </button>

         <ul className="mt-5 px-4">
            {navigation.map((link, idx) => (
               <li key={link.text.toLowerCase() + idx} className="mb-8">
                  <NavLink
                     to={link.to}
                     className={({ isActive }) => `block font-poppins pb-2 border-b border-dashed ${ isActive ? 'text-indigo-500 font-bold border-indigo-500' : 'border-black'}`}
                  >
                     <i className={`fa-regular fa-${link.icon} w-4 h-4 text-center text-lg`}></i>
                     <span className="ml-3">{link.text}</span>
                  </NavLink>
               </li>
            ))}
         </ul>
      </aside>
   );
}

export default Sidebar;
