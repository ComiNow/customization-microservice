import { Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { envs } from './envs';

const logger = new Logger('CloudinaryConfig');

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    logger.log(
      `Configurando Cloudinary para customization-microservice: ${envs.cloudinaryCloudName}`,
    );

    return cloudinary.config({
      cloud_name: envs.cloudinaryCloudName,
      api_key: envs.cloudinaryApiKey,
      api_secret: envs.cloudinaryApiSecret,
    });
  },
};
