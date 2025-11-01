import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ThemesService {
  private prisma = new PrismaClient();

  private readonly DAISYUI_THEMES = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk',
  ];

  async findAll() {
    try {
      const themes = await this.prisma.theme.findMany({
        orderBy: { name: 'asc' },
      });
      return themes;
    } catch (error) {
      throw new RpcException({
        status: 500,
        message: 'Error al obtener temas',
      });
    }
  }

  async findOne(id: number) {
    try {
      const theme = await this.prisma.theme.findUnique({
        where: { id },
      });

      if (!theme) {
        throw new NotFoundException(`Tema con id ${id} no encontrado`);
      }

      return theme;
    } catch (error) {
      throw new RpcException({
        status: error.status || 500,
        message: error.message || 'Error al obtener tema',
      });
    }
  }

  async seedThemes() {
    try {
      const existingThemes = await this.prisma.theme.findMany();

      if (existingThemes.length > 0) {
        return {
          message: 'Los temas ya fueron inicializados',
          count: existingThemes.length,
        };
      }

      const themesData = this.DAISYUI_THEMES.map((name) => ({ name }));

      await this.prisma.theme.createMany({
        data: themesData,
        skipDuplicates: true,
      });

      const allThemes = await this.prisma.theme.findMany();

      return {
        message: 'Temas inicializados correctamente',
        count: allThemes.length,
        themes: allThemes,
      };
    } catch (error) {
      throw new RpcException({
        status: 500,
        message: 'Error al inicializar temas',
      });
    }
  }
}
