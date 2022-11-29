import create from "zustand";
import { persist } from "zustand/middleware";

const AuthStore = (setState) => ({
   token: "",
   saveUser: (clientToken) => {
      setState((state) => ({ ...state, token: clientToken }));
   },
   logoutUser: () => {
      setState((state) => ({ ...state, token: "" }));
   },
});

const useAuthStore = create(persist(AuthStore, { name: "authStore" }));

export default useAuthStore;
