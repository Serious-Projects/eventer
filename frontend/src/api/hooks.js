import useSWR from 'swr';
import { event } from './fetcher';

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