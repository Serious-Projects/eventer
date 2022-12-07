import useSWR from 'swr';
import { event, fetchUser, isParticipant } from './fetcher';

export const useEvents = (token) => {
   /**
    * Api hook to fetch all the created events.
    * 
    * @param {string} token — JWT token for authentication.
    * @returns { events: <Event[]>, isLoading: <boolean>, isError: <Error> }
    */
   const { data, error } = useSWR('/events/public', event(token));
   return {
      events: data,
      isLoading: !error && !data,
      isError: error,
   };
};

export const useEvent = (token, eventId) => {
   /**
    * Api hook to fetch a single created event.
    * 
    * @param {string} token   — JWT token for authentication.
    * @param {string} eventId — To get the particular event from the backend.
    * @returns { event: <Event>, isLoading: <boolean>, isError: <Error> }
    */
   const { data, error } = useSWR(`/events/my/${eventId}`, event(token, eventId));
   return {
      event: data,
      isLoading: !error && !data,
      isError: error,
   };
};

export const useFetchUser = (token, userId) => {
   /**
    * Api hook to fetch a single user.
    * 
    * @param {string} token  — JWT token for authentication.
    * @param {string} userId — To get the particular user from the backend.
    * @returns { user: <User>, isLoading: <boolean>, isError: <Error> }
    */
   const { data, error } = useSWR(`/users/public/${userId}`, fetchUser(token, userId));
   return {
      user: data,
      isLoading: !error && !data,
      isError: error,
   };
};
