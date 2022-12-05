import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Colors = {
   red: "bg-red-200 border-red-400",
   blue: "bg-blue-200 border-blue-400",
};

function EventCard({ id, title, participantsCount, deadline, tags }) {
   const [isClosed, setIsClosed] = useState(true);

   useEffect(() => {
      setIsClosed(() => {
         const now = moment();
         const d1 = moment(deadline);
         return now.diff(d1) > 0;
      });
   }, []);

   return (
      <div className="p-4 md:flex md:flex-col md:justify-between border-2 border-purple-300 border-dashed rounded-[0.35rem]">
         <h3 className="text-lg">{title}</h3>
         <div className="w-full">
            <p className="mt-2 mb-4 p-2 font-poppins text-[0.65rem] flex items-center gap-x-2 border border-dashed rounded">
               <strong>Tags: </strong>
               {tags.length > 0 ? (
                  tags.map(({ text, color }, idx) => (
                     <span
                        key={`${text}-${idx}`}
                        className={`px-2 py-1 border ${Colors[color]} rounded-full`}
                     >
                        {text}
                     </span>
                  ))
               ) : (
                  <em className="flex items-center gap-x-2">
                     No tags found <i className="fa-regular fa-face-sad-tear text-sm ml-1"></i>
                  </em>
               )}
            </p>

            <div className="mt-2 p-2 flex flex-col gap-y-2 border border-dashed rounded">
               <div className="text-center flex justify-between items-center">
                  <strong className="font-medium">Participants</strong>
                  <span>{participantsCount ?? 0}</span>
               </div>
               <hr />
               <div className="text-center flex justify-between items-center">
                  <strong className="font-medium">Deadline</strong>
                  <span className="text-sm">
                     {moment(deadline).format("MMM Do YY, h:mm:ss a")}
                  </span>
               </div>
            </div>
         </div>

         <Link
            to={`/event/${id}`}
            className={`block mt-4 w-full text-center font-poppins py-2 rounded text-white text-base tracking-wide shadow-md shadow-slate-300 ${
               isClosed ? "pointer-events-none bg-slate-400" : "bg-blue-400"
            }`}
         >
            {isClosed ? "Registration Closed" : "View Details"} &nbsp;
            <i
               className={`fa-regular fa-${isClosed ? "ban" : "arrow-right"}`}
            ></i>
         </Link>
      </div>
   );
}

export default EventCard;
