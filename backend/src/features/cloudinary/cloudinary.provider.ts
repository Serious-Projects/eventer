import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
   provide: CLOUDINARY,
   useFactory: () => {
      return v2.config({
         cloud_name: 'dav5ps3uu',
         api_key: '956346378285393',
         api_secret: 'VuynDxWdyCoBTAvlVMzpoy-Mze4',
      });
   },
};
