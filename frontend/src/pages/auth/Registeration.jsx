import { useEffect, useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components';
import { signupSchema } from '../../validation';
import { instance } from '../../api/fetcher';

function SignupPage() {
   const setLayoutData = useOutletContext();
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(signupSchema),
   });

   const submitFormData = async (formData) => {
      const { confirmPassword, ...data_ } = formData;
      try {
         const { data } = await signup(data_);
         setError(null);
         navigate('/auth/login');
      } catch (err) {
         if (err.response.data.status === 409) {
            setError(err.response.data.message);
         }
      }
   };

   useEffect(() => {
      setLayoutData((prev) => ({ title: 'Signup', icon: 'user-plus' }));
   }, []);

   return (
      <form onSubmit={handleSubmit(submitFormData)}>
         {!!error && (
            <div className="my-4 py-2 px-3 bg-red-100 rounded border-2 border-red-300 md:py-3 md:px-0 md:mb-8">
               <p className="text-red-500 text-xs tracking-wide md:text-lg md:text-center">{error}</p>
            </div>
         )}
         
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
