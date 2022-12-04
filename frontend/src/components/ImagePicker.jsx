import { useState, useRef } from 'react';
import defaultProfileImage from '../images/defaultProfile.png';

function ImagePicker({ styles, setSelectedFile }) {
   const [imageMetadata, setImageMetadata] = useState({ image: null, name: '' });
   const inputRef = useRef(null);
   
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setSelectedFile(file);
         const reader = new FileReader();
         reader.addEventListener('load', function loadImg() {
            setImageMetadata({ image: this.result, name: file.name });
         });
         reader.readAsDataURL(file);
      }
   };
   
   const focusFileInput = (e) => {
      inputRef.current.click();
   };
   
   return (
      <div className={`font-poppins ${styles && styles}`}>
         <div className="relative w-48 h-48 mx-auto md:w-64 md:h-64">
            <img
               src={imageMetadata?.image ?? defaultProfileImage}
               alt="Profile Picture"
               className="w-full h-full rounded-full bg-slate-100 object-cover border-4"
            />
            <div className="absolute bottom-0 right-3 p-4 flex justify-center items-center border-4 border-white flex bg-slate-500 text-white z-10 rounded-full" onClick={focusFileInput}>
               <i className="fa-regular fa-camera md:text-xl"></i>
            </div>
         </div>
         <h4 className="text-center mt-3 text-sm md:text-lg md:mt-5">{imageMetadata?.name}</h4>
         
         <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="images/*"
            onChange={handleImageChange}
         />
      </div>
   );
}

export default ImagePicker;
