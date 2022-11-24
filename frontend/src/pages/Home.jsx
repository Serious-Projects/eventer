import { useEffect } from "react";
import EventCard from '../components/EventCard';
import UserCard from '../components/UserCard';
// import { events } from '../data';
import useAuthStore from '../context/AuthContext';
import { useEvents } from '../api/hooks';

function HomePage() {
   const authToken = useAuthStore((state) => state.token);
   const { events, isError, isLoading } = useEvents(authToken);

   if (isError) {
      console.log(isError);
      return <h4>{isError.response.data.message}</h4>;
   }

   if (isLoading) return <p>Loading...</p>;

   return (
      <section className="my-3 mx-auto md:my-8 md:p-8 md:w-[90vw] md:bg-white md:shadow-md md:rounded-[0.425rem] md:shadow-slate-200">
         <h1 className="text-xl md:text-2xl tracking-wide font-poppins mb-3 font-semibold">
            Latest Events <i className="fa-regular fa-arrow-right ml-2 text-indigo-600 animate-move-in"></i>
         </h1>
         <hr className="mt-2 mb-4 md:mb-6" />
         <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {events?.length && events?.map((event, idx) => (
               <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  participantsCount={event.participantsCount}
                  deadline={event.deadline}
                  tags={event.tags ?? []}
               />
            ))}
         </div>
      </section>
   );
}

export default HomePage;