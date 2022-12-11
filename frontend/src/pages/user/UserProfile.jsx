import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchUser } from '../../api/hooks';
import useAuthStore from '../../context/AuthContext';
import defaultProfileImage from '../../images/defaultProfile.png';
import { UserNotFound } from '../../components';

function UserProfilePage() {
   const { id } = useParams();
   const authToken = useAuthStore(state => state.token);
   const { user, isLoading, isError } = useFetchUser(authToken, id);
   const navigate = useNavigate();
   
   if (isLoading) {
      return <h3>Loading...</h3>;
   }
   
   if (isError) {
      if (isError.name === 'AxiosError' && isError.code === 'ERR_NETWORK') {
         return <h1>Sorry we are closed!</h1>;
      } else if (isError.response.data.statusCode === 404) {
         return <UserNotFound />;
      }
      return <h3>{isError.response.data.message}</h3>;
   }
   
   const handleImageEdit = (e) => {
      const url = encodeURIComponent(user?.profileUrl);
      return navigate(`/user/profile?imageId=${user?.profile}&url=${url}`);
   };
   
   return (
      <section className="section">
         <div className="h-[70vh] mt-14 px-3 py-5 md:h-[50vh] md:mt-48 md:bg-white md:shadow-md md:rounded-[0.425rem] md:shadow-slate-200">
            <div className="relative w-48 h-48 mx-auto -mt-16 bg-teal-400 rounded-full shadow-md shadow-slate-200 md:w-72 md:h-72 md:-mt-28">
               <img
                  src={user?.profileUrl ?? defaultProfileImage}
                  className="w-full h-full rounded-full object-cover"
               />
               <button className="absolute img-edit-btn" onClick={handleImageEdit}>
                  <i className="fa-regular fa-pen-to-square text-2xl text-purple-500"></i>
               </button>
            </div>
            <h2 className="mt-3 text-2xl text-center font-semibold md:mt-6 md:text-4xl">
               {user?.name}
            </h2>
            <p className="mt-2 text-sm text-center uppercase tracking-wider md:mt-4 md:text-lg">
               {user?.role ?? 'Person'}
            </p>
            <div className="w-full h-[1px] mt-3 mx-auto bg-teal-400 md:w-[90%] md:mt-5"></div>
         </div>
      </section>
   );
}

export default UserProfilePage;
