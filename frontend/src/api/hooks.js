import useSWR from 'swr';
import { event, fetchUser, isParticipant } from './fetcher';

export const useEvents = (token) => {
   const { data, error } = useSWR('/events/public', event(token));
   return {
      events: data,
      isLoading: !error && !data,
      isError: error,
   };
};

export const useEvent = (token, eventId) => {
   const { data, error } = useSWR(`/events/my/${eventId}`, event(token, eventId));
   return {
      event: data,
      isLoading: !error && !data,
      isError: error,
   };
};

export const useFetchUser = (token, userId) => {
   const { data, error } = useSWR(`/users/public/${userId}`, fetchUser(token, userId));
   return {
      user: data,
      isLoading: !error && !data,
      isError: error,
   };
};
