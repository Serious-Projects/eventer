import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUser } from '../../api/hooks';
import useAuthStore from '../../context/AuthContext';
import defaultProfileImage from '../../images/defaultProfile.png';

function UserProfilePage() {
   const { id } = useParams();
   const authToken = useAuthStore(state => state.token);
   const { user, isLoading, isError } = useFetchUser(authToken, id);
   
   if (isLoading) {
      return <h3>Loading...</h3>;
   }
   
   if (isError) {
      console.log(isError);
      return <h3>{isError.response.data.message}</h3>;
   }
   
   return (
      <section className="font-poppins mx-auto md:my-8 md:p-8 md:w-[90vw]">
         <div className="h-[70vh] mt-14 px-3 py-5 md:h-[50vh] md:mt-48 md:bg-white md:shadow-md md:rounded-[0.425rem] md:shadow-slate-200">
            <div className="w-48 h-48 mx-auto -mt-16 bg-teal-400 rounded-full shadow-md shadow-slate-200 md:w-72 md:h-72 md:-mt-28">
               <img
                  src={user?.imageUrl ?? defaultProfileImage}
                  className="w-full h-full rounded-full object-cover"
               />
            </div>
            <h2 className="mt-3 text-2xl text-center font-semibold md:mt-6 md:text-4xl">
               {user?.name}
            </h2>
            <p className="mt-2 text-sm text-center uppercase tracking-wider md:mt-4 md:text-lg">
               {user?.role}
            </p>
            <div className="w-full h-[1px] mt-3 mx-auto bg-teal-400 md:w-[90%] md:mt-5"></div>
         </div>
      </section>
   );
}

export default UserProfilePage;
