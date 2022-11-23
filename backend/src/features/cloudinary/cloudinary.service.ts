import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
   async uploadImage(file: Express.Multer.File) {
      return new Promise((resolve, reject) => {
         const upload = v2.uploader.upload_stream((err, result) => {
            if (err) return reject(err);
            resolve(result);
         });
         toStream(file.buffer).pipe(upload);
      });
   }
}
