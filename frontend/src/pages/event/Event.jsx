import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { UserCard } from "../../components";
import { useEvent } from "../../api/hooks";
import { isParticipant } from "../../api/fetcher";
import useAuthStore from "../../context/AuthContext";
import { EventNotFound } from "../../components";

function EventPage() {
   const { id } = useParams();
   const authToken = useAuthStore((state) => state.token);
   const [hasParticipated, setHasParticipated] = useState(false);
   const { event, isLoading, isError } = useEvent(authToken, id);
   
   if (isError) {
      console.log(isError);
      if (isError.response.status === 404) {
         return <EventNotFound />;
      }
   }
   
   useEffect(() => {
      isParticipant(authToken, id).then((data) => {
         setHasParticipated(data.isEnrolled);
      }).catch(err => {
         console.log(err);
         setHasParticipated(false);
      });
   }, []);
   
   if (isLoading) {
      return <h2>Loading...</h2>;
   }

   return (
      <>
         <div>
            <h1 className="text-xl font-semibold md:text-3xl">
               {event?.title}
            </h1>
            <p className="mt-3 text-slate-400 text-sm leading-6 md:text-xl md:mt-4 md:leading-8">
               {event?.description}
            </p>
            {!hasParticipated ? (
               <Link
                  to={`/event/subscribe/${event.id}`}
                  className="block bg-blue-300 text-blue-800 text-center tracking-wide uppercase text-sm mt-4 py-3 rounded-full font-semibold shadow-md md:mt-6 md:py-4 md:text-xl"
               >
                  <i className="fa-regular fa-hand-point-right mr-4 text-lg md:text-2xl"></i>
                  Join here
                  <i className="fa-regular fa-hand-point-left ml-4 text-lg md:text-2xl"></i>
               </Link>
            ) : (
               <p className="mt-4 text-sm text-slate-400 font-semibold">You have already enrolled to this event.</p>
            )}
         </div>

         <hr className="mt-5 mb-4 md:mt-8 md:mb-6" />

         <div>
            <h1 className="text-xl font-semibold md:text-3xl">
               Participants who joined <i className="fa-regular fa-arrow-right ml-2"></i>
            </h1>
            <div className="grid grid-cols-2 justify-items-center mt-4 gap-3 md:grid-cols-4 md:gap-4 md:mt-6">
               {!!event?.participants.length &&
                  event.participants.map((user, idx) => (
                     <UserCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        imageUrl={user.imageUrl}
                        role={user.role}
                     />
                  ))}
            </div>
         </div>
      </>
   );
}

export default EventPage;
