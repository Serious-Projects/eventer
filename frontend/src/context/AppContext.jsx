import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = Object.freeze({
   sessionToken: localStorage.getItem('ACCESS_TOKEN'),
   isNavbarOpen: false,
});

export const Actions = Object.freeze({
   LOGIN: 'LOGIN_ACTION_TYPE',
   LOGOUT: 'LOGOUT_ACTION_TYPE',
   TOGGLE_NAV: 'TOGGLE_NAV_ACTION_TYPE',
});

const reducer = (state, action) => {
   const { payload } = action;
   
   switch (action.type) {
      case Actions.LOGIN:
         localStorage.setItem('ACCESS_TOKEN', payload);
         return { ...state, sessionToken: payload };
      case Actions.LOGOUT:
         localStorage.removeItem('ACCESS_TOKEN');
         return { ...state, sessionToken: null };
      case Actions.TOGGLE_NAV:
         return { ...state, isNavbarOpen: !state.isNavbarOpen };
      default:
         return state;
   }
};

export default function AppContextProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);
   
   const trigger = (request) => {
      // Gaurd to prevent triggering of unknown action types.
      if (!Object.values(Actions).includes(request.type)) {
         throw new Error('Invalid action type.');
      } else {
         dispatch(request);
      }
   };
   
   return (
      <AppContext.Provider value={{ state, trigger }}>
         {children}
      </AppContext.Provider>
   );
}

export const useAppContext = () => useContext(AppContext);
