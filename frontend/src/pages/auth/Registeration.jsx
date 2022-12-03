import { useLayoutEffect, useState, useEffect, useRef } from 'react';
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
   const [error, setError] = useState(null);
   const [imageMetadata, setImageMetadata] = useState({ image: null, name: '' });
   const [selectedFile, setSelectedFile] = useState(null);
   const navigate = useNavigate();
   const { token, saveUser } = useAuthStore((state) => ({ token: state.token, saveUser: state.saveUser }));
   const inputRef = useRef(null);

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(signupSchema),
   });

   const submitFormData = async (formData) => {
      const { confirmPassword, ...data } = formData;
      try {
         const result = await createProfile({
            profile: data,
            profilePicture: selectedFile,
         });
         setError(null);
         saveUser(result.access_token);
         navigate('/');
      } catch (err) {
         console.error(err);
         if (err.response.data.statusCode === 409) {
            setError(err.response.data.message);
         }
      }
   };

   useLayoutEffect(() => {
      setLayoutData((prev) => ({ title: 'Signup', icon: 'user-plus' }));
   }, []);
   
   useEffect(() => {
      if (!!token) return navigate('/');
   }, []);
   
   if (error) {
      toast.error(error);
   }

   return (
      <form onSubmit={handleSubmit(submitFormData)}>
         <ImagePicker
            ref={inputRef}
            styles="mb-5"
            imageMetadata={imageMetadata}
            setImageMetadata={setImageMetadata}
            setSelectedFile={setSelectedFile}
         />
         
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
