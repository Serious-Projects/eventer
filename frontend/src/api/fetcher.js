import axios from 'axios';

export const api = axios.create({
   baseURL: 'http://localhost:3000',
   headers: {
      'Content-Type': 'application/json',
   },
});

// Auth API Fetchers
export const login = (credentials) => api.post('/v1/auth/login', credentials);
export const signup = (credentials) => api.post('/users/create', credentials);

// Event API Fetchers
export function event(token) {
   /**
    * Fetches all the events from the backend.
    * 
    * @param {string} token — JWT Auth Token for authentication.
    * @returns Event[]
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
   });
   return (url) => api.get(url).then((res) => res.data);
}

export function createEvent(token, event) {
   /**
    * Creates an event from the data provided.
    * 
    * @param {string} token — JWT Auth Token for authentication.
    * @param {Event} event  — Event details.
    * @returns Event
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
   });
   return api.post('/events/create', event);
}

export function enrollEvent(token, eventId) {
   /**
    * Registers the user to the particular event.
    * 
    * @param {string} token   — JWT Auth Token for authentication.
    * @param {string} eventId — Event ID to check for the registration.
    * @returns { id: <string> }
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
   });
   return api.get(`/events/enroll/${eventId}`);
}

export function withdrawEventEnrollment(token, eventId) {
   /**
    * Unregisters the user from the particular event.
    * 
    * @param {string} token   — JWT Auth Token for authentication.
    * @param {string} eventId — Event ID to unregister from the event.
    * @returns { id: <string> }
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
   });
   return api.get(`/events/withdraw/${eventId}`);
}

// User API Fetchers
export function fetchUser(token, userId) {
   /**
    * Gets the particular user from the backend.
    * 
    * @param {string} token  — JWT Auth Token for authentication.
    * @param {string} userId — User ID to get the user.
    * @returns User
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
   });
   return (url) => api.get(url).then((res) => res.data);
}

export function isParticipant(token, eventId) {
   /**
    * Checks wheather the user has registered to the particular event.
    * 
    * @param {string} token   — JWT Auth Token for authentication.
    * @param {string} eventId — Event ID to check for the event registration.
    * @returns { isEnrolled: <boolean> }
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
   });
   return api.get(`/events/check-participation/${eventId}`).then((res) => res.data);
}

export function updateProfilePicture(token, image, oldImageId) {
   /**
    * Updates the user's profile display picture.
    * 
    * @param {string} token      — JWT Auth Token for authentication.
    * @param {Object} data       — Profile picture data.
    * @param {string} oldImageId — Current image ID to delete and replace with the new image.
    * @returns Unknown
    */
   api.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      delete config.headers['Content-Type'];
      return config;
   });
   const formData = new FormData();
   formData.append('profile', image);
   return api.patch('/users/update/upload', formData, {
      params: {
         oldImage: oldImageId,
      },
   });
}

export function uploadProfilePicture(newImage) {
   /**
    * Creates the user's profile display picture.
    * 
    * @param {string} newImage — New image data.
    * @returns { public_id: <string>, secure_url: <string> }
    */
   api.interceptors.request.use((config) => {
      delete config.headers['Content-Type'];
      return config;
   });
   const formData = new FormData();
   formData.append('profile', newImage);
   return api.post('/users/create/upload', formData);
}

export function createProfile({ profile, profilePicture }) {
   /**
    * Creates a new user.
    * 
    * @param {Object} profile        — New user's data.
    * @param {string} profilePicture — New image data.
    * @returns User
    */
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
      }
      reject(new Error('Could not create profile'));
   });
}
