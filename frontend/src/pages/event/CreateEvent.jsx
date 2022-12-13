import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Input } from '../../components';
import { createEventSchema } from '../../validation';
import { createEvent } from '../../api/fetcher';
import useAuthStore from '../../context/AuthContext';

function CreateEventPage() {
   const { register, handleSubmit, watch, formState: { errors } } = useForm({
      resolver: zodResolver(createEventSchema),
   });
   const authToken = useAuthStore(state => state.token);
   const navigate = useNavigate();
   
   const submitEventData = async (eventData) => {
      try {
         const _eventData = {
            ...eventData,
            beginAt: moment(eventData.beginAt).format(),
            endAt: moment(eventData.endAt).format(),
            deadline: moment(eventData.deadline).format(),
         };
         await createEvent(authToken, _eventData);
         navigate('/');
      } catch (err) {
         console.log(err);
         if (err.response.data.statusCode === 400) {
            toast.error(err.response.data.message.join(', '));
         }
         toast.error(err.response.data.message);
      }
   };

   return (
      <>
         <h2 className="text-3xl font-semibold text-center text-teal-500 md:text-4xl md:mb-5">
            Create an Event <i className="fa-solid fa-plus-large ml-2"></i>
         </h2>

         <hr className="my-5" />

         <form onSubmit={handleSubmit(submitEventData)}>
            <div className="flex flex-col gap-5 mb-6 md:gap-x-5">
               <Input
                  type="text"
                  labelText="Event Title"
                  name="title"
                  register={register}
                  placeholder="The news of great Bombay"
                  errorText={errors?.title}
               />
               <div className="w-full">
                  <label htmlFor="description" className="block mb-2 text-slate-600 text-sm uppercase font-semibold tracking-wide">
                     Event Description
                  </label>
                  <textarea
                     id="description"
                     rows={5}
                     {...register('description')}
                     className="w-full p-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                     placeholder="The great Indian Bombay was established in the year 1965."
                  ></textarea>
                  {!!errors?.description && (
                     <small className="block mt-2 text-red-500">
                        <i className="fa-solid fa-triangle-exclamation ml-1"></i>{" "}
                        &nbsp;
                        {errors.description.message}
                     </small>
                  )}
               </div>
            </div>

            <div className="flex flex-col gap-5 mb-6 md:flex-row md:gap-x-5">
               <Input
                  type="date"
                  labelText="Event start date"
                  name="beginAt"
                  register={register}
                  errorText={errors?.beginAt}
               />
               <Input
                  type="date"
                  labelText="event End date"
                  name="endAt"
                  register={register}
                  errorText={errors?.endAt}
                  isDisabled={!watch('beginAt')}
               />
               <Input
                  type="date"
                  labelText="Registration Deadline"
                  name="deadline"
                  register={register}
                  errorText={errors?.deadline}
                  isDisabled={!watch('endAt')}
               />
            </div>

            <button
               type="submit"
               className="w-full px-4 py-3 bg-teal-500 text-sm text-white rounded uppercase font-semibold tracking-wider shadow-md md:w-auto md:mt-6 md:py-3 md:text-lg"
            >
               Create Event <i className="fa-solid fa-plus-large ml-2"></i>
            </button>
         </form>
      </>
   );
}

export default CreateEventPage;
