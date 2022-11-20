import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './components';
import { CreateEvent, Event, EventSubscription, Home, Login, Signup, UserProfile } from './pages';
import { AuthLayout, EventLayout } from './pages/layouts';
import ProtectedRoute from './ProtectedRoute';
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
               </Route>
               
               <Route path="/event" element={<EventLayout />}>
                  <Route path=":id" element={<Event />} />
                  <Route path="create" element={<CreateEvent />} />
                  <Route path="subscribe/:id" element={<EventSubscription />} />
               </Route>
               
               <Route element={<ProtectedRoute />}>
                  <Route path="/user/:id" element={<UserProfile />} />
               </Route>
            </Routes>
         </main>
      </>
   );
}

export default App;
