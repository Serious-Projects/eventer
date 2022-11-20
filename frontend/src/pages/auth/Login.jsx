import { useLayoutEffect, useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components';
import { loginSchema } from '../../validation';
import { login } from '../../api/fetcher';
import useAuthStore from '../../context/AuthContext';

function LoginPage() {
   const setLayoutData = useOutletContext();
   const { token, saveUser } = useAuthStore((state) => ({ token: state.token, saveUser: state.saveUser }));
   const navigate = useNavigate();
   const [error, setError] = useState(null);

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(loginSchema),
   });

   useLayoutEffect(() => {
      if (!!token) return navigate(-1);
      setLayoutData((prev) => ({ title: 'Login', icon: 'right-to-bracket' }));
   }, []);

   const submitFormData = async (formData) => {
      try {
         const { data } = await login(formData);
         saveUser(data.token);
         setError(null);
         navigate(-1);
      } catch (err) {
         if (err.response.data.status === 404) {
            setError(err.response.data.message);
         }
      }
   };

   return (
      <form onSubmit={handleSubmit(submitFormData)}>
         <div className="flex flex-col gap-5 mb-6 md:flex-row md:gap-x-5">
            <Input
               type="email"
               labelText="Email"
               name="email"
               register={register}
               placeholder="johndoe@gmail.com"
               errorText={errors?.email}
            />
            <Input
               type="password"
               labelText="Password"
               name="password"
               register={register}
               placeholder="************"
               errorText={errors?.password}
            />
         </div>

         <div className="mt-8 flex flex-col gap-y-5 items-center md:flex-row md:gap-x-5">
            <button
               type="submit"
               className="w-full py-2 bg-teal-500 text-white rounded uppercase font-semibold tracking-wider shadow-md md:w-32 md:text-lg"
            >
               Login &nbsp;<i className="fa-regular fa-right-to-bracket"></i>
            </button>
            <Link to="/auth/signup">
               Don't have an account?{" "}
               <span className="text-blue-600">Create One.</span>
            </Link>
         </div>
      </form>
   );
}

export default LoginPage;
