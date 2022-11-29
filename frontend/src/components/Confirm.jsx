import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confirmGIFImage from "../images/check-animation.gif";

function ConfirmBox({ backIn }) {
   const navigate = useNavigate();

   useEffect(() => {
      setTimeout(() => navigate(-1), backIn ?? 3000);
   }, []);

   return (
      <div className="flex flex-col items-center">
         <img
            src={confirmGIFImage}
            alt="Confirmation"
            className="w-52 object-contain"
         />
         <h3 className="text-2xl text-purple-600 font-semibold md:text-4xl">
            Congratulations...!
         </h3>
         <p className="text-sm text-slate-400 mt-3 tracking-wide md:mt-6 md:text-xl">
            Redirecting you back<span className="tracking-wider">...</span>
         </p>
      </div>
   );
}

export default ConfirmBox;
