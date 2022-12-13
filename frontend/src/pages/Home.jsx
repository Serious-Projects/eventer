import { useEffect } from 'react';
import EventCard from '../components/EventCard';
import UserCard from '../components/UserCard';
// import useAuthStore from '../context/AuthContext';
import { useAppContext, Actions } from '../context/AppContext';
import { useEvents } from '../api/hooks';

function HomePage() {
   const { state, trigger } = useAppContext();
   const { events, isError, isLoading } = useEvents(state.sessionToken);

   if (isError) {
      if (isError.name === 'AxiosError' && isError.code === 'ERR_NETWORK') {
         return <h4>Our service is down for a while!</h4>;
      }
      return <h4>{isError.response.data.message}</h4>;
   }
   
   useEffect(() => {
      trigger({ type: Actions.LOAD_EVENTS, payload: events });
   }, []);

   if (isLoading) return <p>Loading...</p>;

   if (!events.length) {
      return (
         <div className="flex flex-col items-center mt-10 font-poppins">
            <h3 className="font-medium text-xl">
               There are no events currently created!
            </h3>
         </div>
      );
   }

   return (
      <section className="section">
         <h1 className="text-xl md:text-2xl tracking-wide font-poppins mb-3 font-semibold">
            Latest Events
            <i className="fa-regular fa-arrow-right ml-2 text-indigo-600 animate-move-in"></i>
         </h1>
         <hr className="mt-2 mb-4 md:mb-6" />
         <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {events.map((event, idx) => (
               <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  participantsCount={event?._count.participants}
                  deadline={event.deadline}
                  tags={event.tags ?? []}
               />
            ))}
         </div>
      </section>
   );
}

export default HomePage;
