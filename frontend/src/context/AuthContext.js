import create from "zustand";
import { persist } from "zustand/middleware";

export default create(
   persist(
      (setState) => ({
         token: "",
         saveUser: (clientToken) => {
            setState((state) => ({ ...state, token: clientToken }));
         },
         logoutUser: () => {
            setState((state) => ({ ...state, token: "" }));
         },
      }),
      { name: "authStore" }
   )
);
