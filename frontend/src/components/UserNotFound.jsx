import userNotFoundImage from "../images/user-not-found.png";

function UserNotFound() {
   return (
      <div className="flex flex-col">
         <img
            src={userNotFoundImage}
            alt="Event not found"
            className="w-52 mx-auto object-cover drop-shadow-lg md:w-72 md:drop-shadow-xl"
         />
         <div className="flex flex-col text-center space-y-1 md:space-y-3">
            <h3 className="font-semibold text-xl md:text-4xl">Oops! User Not Found | <span className="text-indigo-500">404</span></h3>
            <p className="text-sm text-slate-500 tracking-wide md:text-xl">
               The user you are searching for does not exist.
            </p>
         </div>
      </div>
   );
}

export default UserNotFound;
