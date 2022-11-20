import { NavLink } from 'react-router-dom';
import { navigation } from '../data';

function Navbar({ toggle }) {
   return (
      <nav className="py-3 px-4 border-b rounded-[0.7rem] shadow md:px-6 md:py-5">
         <div className="flex justify-between items-center">
            <NavLink to="/" className="text-2xl font-semibold font-poppins">
               Eventer
               <span className="text-indigo-500">.io</span>
            </NavLink>
            <button
               type="button"
               className="flex flex-col gap-y-1 border rounded p-2 md:hidden"
               onClick={() => toggle(true)}
            >
               <span className="w-5 h-0.5 bg-gray-300 rounded"></span>
               <span className="w-5 h-0.5 bg-gray-300 rounded"></span>
               <span className="w-5 h-0.5 bg-gray-300 rounded"></span>
            </button>

            <ul className="hidden md:flex gap-x-6">
               {navigation.map(({ to, text, icon }, idx) => (
                  <li key={`${text}-${idx}`} className="uppercase text-center">
                     <NavLink to={to}>
                        {({ isActive }) => (
                           <>
                              <i className={`fa-regular fa-${icon} w-4 h-4 mr-2 ${isActive && 'text-indigo-500'}`}></i>
                              <span className={`${isActive && 'text-indigo-500 font-bold'}`}>
                                 {text}
                              </span>
                           </>
                        )}
                     </NavLink>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   );
}

export default Navbar;
