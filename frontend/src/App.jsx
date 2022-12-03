import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar, Sidebar } from './components';
import {
   CreateEvent,
   Event,
   EventSubscription,
   Home,
   Login,
   Logout,
   ProfileUpdate,
   Signup,
   UserProfile,
} from './pages';
import { AuthLayout, EventLayout } from './pages/layouts';
import ProtectedRoute from './ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <Navbar toggle={setIsOpen} />
         <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
         <main className="px-4 py-2 md:px-8">
            <Routes>
               <Route exact path="/" element={<Home />} />

               <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="logout" element={<Logout />} />
               </Route>

               <Route path="/event" element={<EventLayout />}>
                  <Route path=":id" element={<Event />} />
                  <Route path="create" element={<CreateEvent />} />
                  <Route path="subscribe/:id" element={<EventSubscription />} />
               </Route>

               <Route element={<ProtectedRoute />}>
                  <Route path="/user/:id" element={<UserProfile />} />
                  <Route path="/user/profile" element={<ProfileUpdate />} />
               </Route>
            </Routes>
         </main>
         
         <ToastContainer
            position="bottom-center"
            autoClose={5000}
            newestOnTop={true}
            hideProgressBar
            closeOnClick
            pauseOnHover
            theme="colored"
         />
      </>
   );
}

export default App;
