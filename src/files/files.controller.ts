import { Controller, Logger } from '@nestjs/common';
import { FilesService } from './files.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger('FilesController');

  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({ cmd: 'upload_customization_logo' })
  async uploadLogo(@Payload() fileData: any): Promise<{ fileName: string }> {
    try {
      const file = this.deserializeFile(fileData);
      const fileUrl = await this.filesService.uploadFile(
        file,
        'coffee-now/customization/logos',
      );
      return { fileName: fileUrl };
    } catch (error) {
      this.logger.error(`Error en uploadLogo: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'upload_customization_carousel' })
  async uploadCarouselImage(
    @Payload() fileData: any,
  ): Promise<{ fileName: string }> {
    try {
      const file = this.deserializeFile(fileData);
      const fileUrl = await this.filesService.uploadFile(
        file,
        'coffee-now/customization/carousel',
      );
      return { fileName: fileUrl };
    } catch (error) {
      this.logger.error(`Error en uploadCarouselImage: ${error.message}`);
      throw error;
    }
  }

  private deserializeFile(fileData: any) {
    return {
      originalname: fileData.originalname,
      mimetype: fileData.mimetype,
      size: fileData.size,
      buffer: Buffer.from(fileData.buffer, 'base64'),
    };
  }
}
