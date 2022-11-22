import { useParams, useNavigate } from 'react-router-dom';
import { enrollEvent } from '../../api/fetcher';
import useAuthStore from '../../context/AuthContext';

function EventSubscriptionPage() {
   const { id } = useParams();
   const navigate = useNavigate();
   const authToken = useAuthStore(state => state.token);

   const subscribeEvent = async (event) => {
      // Event subscription logic here...
      try {
         const { data: event } = await enrollEvent(authToken, id);
         if (event.id === id) return navigate('/');
      } catch (err) {
         if (err.response.data.statusCode === 400) {
            alert(err.response.data.message);
            return navigate(-1);
         }
      }
   };

   return (
      <div className="w-full">
         <p className="mb-4 md:text-3xl">
            Subscribing to: <br className="md:hidden" />
            <small className="font-semibold">{id}</small>
         </p>
         <div className="mt-8 flex items-center gap-x-2 md:gap-x-6">
            <button
               onClick={subscribeEvent}
               className="py-3 px-2 bg-teal-600 text-white text-xs rounded tracking-wide font-semibold uppercase shadow-lg md:text-lg md:p-4 md:tracking-wider md:rounded-[0.45rem]"
            >
               Confirm Subscription <i className="fa-solid fa-check ml-2 -rotate-6 md:text-[1.4rem]"></i>
            </button>
            <button
               onClick={(e) => navigate(-1)}
               className="py-3 px-2 border border-orange-600 text-orange-600 text-xs rounded tracking-wide font-semibold uppercase md:text-lg md:p-4 md:tracking-wider md:rounded-[0.45rem]"
            >
               <i className="fa-solid fa-arrow-left mr-2"></i> Go Back
            </button>
         </div>
      </div>
   );
}

export default EventSubscriptionPage;
