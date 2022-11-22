import axios from 'axios';

export const instance = axios.create({
   baseURL: 'http://localhost:3000',
   headers: {
      'Content-Type': 'application/json',
   },
});

export function login(credentials) {
   return instance.post('/v1/auth/login', credentials);
}

export function signup(credentials) {
   return instance.post('/users/create', credentials);
}

export function event(token) {
   instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
   return (...args) => instance.get(...args).then((res) => res.data);
}

export function createEvent(event) {
   instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
   return instance.post('/events/create', event);
}

export function enrollEvent(token, eventId) {
   instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
   return instance.get(`/events/enroll/${eventId}`);
}

export function withdrawEventEnrollment(eventId) {
   instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
   return instance.get(`/events/withdraw/${eventId}`);
}

export function fetchUser(token, userId) {
   instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
   return (url) => instance.get(url).then(res => res.data);
}