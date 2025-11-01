import { Module } from '@nestjs/common';
import { CustomizationModule } from './customization/customization.module';
import { ThemesModule } from './themes/themes.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CustomizationModule, ThemesModule, FilesModule],
})
export class AppModule {}
