import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ThemesService } from './themes.service';

@Controller()
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @MessagePattern({ cmd: 'find_all_themes' })
  findAll() {
    return this.themesService.findAll();
  }

  @MessagePattern({ cmd: 'find_theme_by_id' })
  findOne(data: { id: number }) {
    return this.themesService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'seed_themes' })
  seedThemes() {
    return this.themesService.seedThemes();
  }
}
