import { useLayoutEffect, useState, useEffect } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { Input, ImagePicker } from '../../components';
import { signupSchema } from '../../validation';
import { createProfile } from '../../api/fetcher';
import useAuthStore from '../../context/AuthContext';

function SignupPage() {
   const setLayoutData = useOutletContext();
   const [selectedFile, setSelectedFile] = useState(null);
   const navigate = useNavigate();
   const { token, saveUser } = useAuthStore((state) => ({ token: state.token, saveUser: state.saveUser }));

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(signupSchema),
   });

   const submitFormData = async (formData) => {
      const { confirmPassword, ...data } = formData;
      try {
         // Create an account with the user data and profile picture
         const result = await createProfile({ profile: data, profilePicture: selectedFile });
         // Save the user auth data to the app state
         saveUser(result.access_token);
         // Finally redirect the user back to the home page
         navigate('/');
      } catch (err) {
         console.error(err);
         if (err.response.data.statusCode === 409) {
            // Error, if the email is already taken
            toast.error(err.response.data.message);
         }
      }
   };

   useLayoutEffect(() => {
      // Updating the page contents according to the auth type
      setLayoutData((prev) => ({ title: 'Signup', icon: 'user-plus' }));
   }, []);
   
   useEffect(() => {
      // Check if the user is already logged-in, else redirect to the home page
      if (!!token) return navigate('/');
   }, []);

   return (
      <form onSubmit={handleSubmit(submitFormData)}>
         <ImagePicker styles="mb-5" setSelectedFile={setSelectedFile} />
         <div className="flex flex-col gap-5 mb-6 md:flex-row md:gap-x-5">
            <Input
               type="text"
               labelText="Username"
               name="name"
               register={register}
               placeholder="johndoe123"
               errorText={errors?.name}
            />
            <Input
               type="email"
               labelText="Email"
               name="email"
               register={register}
               placeholder="johndoe@gmail.com"
               errorText={errors?.email}
            />
         </div>

         <div className="flex flex-col gap-5 mb-6 md:flex-row md:gap-x-5">
            <Input
               type="password"
               labelText="Password"
               name="password"
               register={register}
               placeholder="Choose a strong password"
               errorText={errors?.password}
            />
            <Input
               type="password"
               labelText="Confirm Password"
               name="confirmPassword"
               register={register}
               placeholder="Repeat your password"
               errorText={errors?.confirmPassword}
            />
         </div>

         <div className="mt-8 flex items-center flex-col gap-y-5 md:gap-x-5 md:flex-row">
            <button
               type="submit"
               className="w-full py-2 bg-teal-500 text-white rounded uppercase font-semibold tracking-wider shadow-md md:w-40 md:py-3 md:text-lg"
            >
               Signup <i className="fa-regular fa-user-plus ml-2"></i>
            </button>
            <Link to="/auth/login">
               Already have an account? <span className="text-blue-600">Login here.</span>
            </Link>
         </div>
      </form>
   );
}

export default SignupPage;
