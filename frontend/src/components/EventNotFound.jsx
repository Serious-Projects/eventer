import eventNotFoundImage from "../images/event404.png";

function EventNotFound() {
   return (
      <div className="flex flex-col">
         <img
            src={eventNotFoundImage}
            alt="Event not found"
            className="w-52 mx-auto object-cover drop-shadow-lg md:w-72 md:drop-shadow-xl"
         />
         <div className="flex flex-col text-center space-y-3 md:space-y-4">
            <h3 className="font-semibold text-xl md:text-4xl">
               Oops! Event Not Found |{" "}
               <span className="text-indigo-500">404</span>
            </h3>
            <p className="text-sm text-slate-500 tracking-wide md:text-xl">
               The event you are searching for does not exist. Please go back
               and try again to come here.
            </p>
         </div>
      </div>
   );
}

export default EventNotFound;
