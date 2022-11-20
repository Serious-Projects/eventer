import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
   const [pageLayoutData, setPageLayoutData] = useState({});

   return (
      <section className="font-poppins mx-auto md:my-8 md:p-8 md:w-[90vw] md:bg-white md:shadow-md md:rounded-[0.325rem] md:shadow-slate-200">
         <h2 className="mt-3 text-3xl font-semibold text-center text-teal-500 md:text-4xl md:mb-5">
            {pageLayoutData?.title} &nbsp;
            <i className={`fa-solid fa-${pageLayoutData?.icon}`}></i>
         </h2>
         <p className="mt-3 text-center text-xs text-slate-400 md:text-sm md:px-4">
            We do not sell any of your personal information to any third party
            services. We are strictly ethical with our work and services. We
            don't intervene into our customers privacy at all. All your data is
            safe with us.
         </p>

         <hr className="mt-3 mb-5 md:mt-5" />

         <Outlet context={setPageLayoutData} />
      </section>
   );
}

export default AuthLayout;
