import { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuthStore from "../../context/AuthContext";

function EventLayout() {
   const hasToken = useAuthStore((state) => state.token);
   
   return (
      <section className="font-poppins my-4 mx-auto md:my-8 md:p-8 md:w-[90vw] md:bg-white md:shadow-md md:rounded-[0.425rem] md:shadow-slate-200">
         {!!hasToken ? <Outlet /> : <Navigate to="/auth/login" replace />}
      </section>
   );
}

export default EventLayout;
