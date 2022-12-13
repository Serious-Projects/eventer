import { Injectable, BadRequestException } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
   uploadImage(file: Express.Multer.File, publicId?: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
      return new Promise((resolve, reject) => {
         if (file && file.buffer) {
            const upload = v2.uploader.upload_stream(
               {
                  folder: 'images',
                  ...(publicId && { public_id: publicId }),
               },
               (err, result) => {
                  if (err) reject(err);
                  else resolve(result);
               }
            );
            toStream(file.buffer).pipe(upload);
         } else {
            reject(new BadRequestException('image was missing or corrupted'));
         }
      });
   }
   
   deleteImage(image: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
      return new Promise((resolve, reject) => {
         v2.uploader.destroy(image, (err, result) => {
            if (err) reject(err);
            else resolve(result);
         });
      });
   }
}
