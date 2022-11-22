import { Link } from 'react-router-dom';
import defaultProfileImage from '../images/defaultProfile.png';

function UserCard({ id, imageUrl, name, role }) {
   return (
      <Link to={`/user/${id}`} className="w-full">
         <div className="w-full px-1 py-3 border-2 border-dashed rounded-[0.45rem] font-poppins shadow">
            <div className="flex flex-col justify-center items-center gap-y-3 text-center">
               <img
                  src={imageUrl ?? defaultProfileImage}
                  className="w-24 h-24 rounded-full object-cover border-[0.2rem] border-teal-400"
               />
               <div className="flex-1">
                  <h3 className="font-semibold text-indigo-500">{name}</h3>
                  <p className="text-sm">{role ?? 'Person'}</p>
               </div>
            </div>
         </div>
      </Link>
   );
}

export default UserCard;
