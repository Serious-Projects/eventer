function Input({ labelText, type, name, register, placeholder, errorText, styles, isDisabled }) {
   return (
      <div className="w-full">
         <label htmlFor={name} className="block mb-2 text-slate-600 text-sm uppercase font-semibold tracking-wide">
            {labelText}
         </label>
         <input
            type={type}
            id={name}
            {...register(name)}
            className={`w-full p-2 text-sm border rounded focus:outline-none focus:ring ${errorText ? 'border-red-300 focus:ring-red-300' : 'focus:ring-blue-300'} ${styles}`}
            placeholder={placeholder}
            disabled={isDisabled ?? false}
         />
         {!!errorText && (
            <small className="block mt-2 text-red-500">
               <i className="fa-solid fa-triangle-exclamation ml-1"></i> &nbsp;
               {errorText?.message}
            </small>
         )}
      </div>
   );
}

export default Input;
