import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImagePicker } from '../../components';
import { updateProfilePicture } from '../../api/fetcher';
import useAuthStore from '../../context/AuthContext';

function ProfileUpdate() {
   const [selectedImage, setSelectedImage] = useState(null);
   const [queryParams] = useSearchParams();
   const navigate = useNavigate();
   const authToken = useAuthStore(state => state.token);
   const imageID = queryParams.get('imageId');
   const url = queryParams.get('url');
   
   const updateProfilePic = (e) => {
      updateProfilePicture(authToken, selectedImage, imageID)
         .then(({ data }) => {
            console.log(data);
            navigate(`/user/${data.id}`);
         })
         .catch(err => {
            if (err.response.data.statusCode === 400) {
               toast.error(err.response.data.message);
               return;
            }
            console.error(err);
         });
   };
   
   return (
      <>
         <h2 className="mt-3 text-2xl font-poppins font-semibold text-center">Update Profile Picture</h2>
         <ImagePicker
            styles="mt-5"
            oldImageUrl={url}
            setSelectedFile={setSelectedImage}
            profilePicId={imageID}
         />
         
         <button
            onClick={updateProfilePic}
            className="w-full mt-3 py-2 font-medium bg-sky-500 rounded-full"
         >
            Update Profile Picture
         </button>
      </>
   );
}

export default ProfileUpdate;
