import { useState, useEffect } from 'react';
import { isParticipant } from '../api/fetcher';

function useEventTracker(authToken, id) {
   const [eventParticipationStatus, setEventParticipationStatus] = useState({
      participated: false,
      error: null,
   });
   
   useEffect(() => {
      isParticipant(authToken, id)
         .then((data) => {
            setEventParticipationStatus((prevState) => ({ ...prevState, participated: data.isEnrolled }));
         })
         .catch(err => {
            setEventParticipationStatus((prevState) => ({ ...prevState, error: err.response.data }));
         });
   }, []);
   
   return eventParticipationStatus;
}

export default useEventTracker;