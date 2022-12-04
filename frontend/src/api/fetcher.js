import axios from 'axios';

export const instance = axios.create({
   baseURL: 'http://localhost:3000',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Auth API Fetchers
export const login = (credentials) => instance.post('/v1/auth/login', credentials);
export const signup = (credentials) => instance.post('/users/create', credentials);

// Event API Fetchers
export function event(token) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return (url) => instance.get(url).then((res) => res.data);
}

export function createEvent(token, event) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return instance.post('/events/create', event);
}

export function enrollEvent(token, eventId) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return instance.get(`/events/enroll/${eventId}`);
}

export function withdrawEventEnrollment(eventId) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return instance.get(`/events/withdraw/${eventId}`);
}

// User API Fetchers
export function fetchUser(token, userId) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return (url) => instance.get(url).then((res) => res.data);
}

export function isParticipant(token, eventId) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return instance
      .get(`/events/check-participation/${eventId}`)
      .then((res) => res.data);
}

export function updateProfilePicture(token, data, oldImage) {
   instance.defaults.headers.common.authorization = `Bearer ${token}`;
   return instance.patch('/events/update/upload', data, {
      params: { oldImage },
   });
}

export function uploadProfilePicture(newImage) {
   const formData = new FormData();
   formData.append('profile', newImage);
   return axios.post('http://localhost:3000/users/create/upload', formData);
}

export function createProfile({ profile, profilePicture }) {
   return new Promise(async (resolve, reject) => {
      if (!!Object.entries(profile).length) {
         try {
            const { data: { public_id, secure_url } } = await uploadProfilePicture(profilePicture);
            const result = await signup({
               ...profile,
               profile: public_id,
               profileUrl: secure_url,
            });
            resolve(result.data);
         } catch (err) {
            reject(err);
         }
      } else {
         reject(new Error('Could not create profile'));
      }
   });
}
