import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUIConfigurationDto } from './dto/create-ui-configuration.dto';
import { UpdateUIConfigurationDto } from './dto/update-ui-configuration.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CustomizationService {
  private prisma = new PrismaClient();

  async create(createDto: CreateUIConfigurationDto) {
    try {
      const existing = await this.prisma.uIConfiguration.findUnique({
        where: { businessId: createDto.businessId },
      });

      if (existing) {
        throw new ConflictException(
          `Ya existe una configuración para el negocio ${createDto.businessId}`,
        );
      }

      const themeExists = await this.prisma.theme.findUnique({
        where: { id: createDto.themeId },
      });

      if (!themeExists) {
        throw new NotFoundException(
          `El tema con id ${createDto.themeId} no existe`,
        );
      }

      const uiConfig = await this.prisma.uIConfiguration.create({
        data: {
          businessId: createDto.businessId,
          brand: createDto.brand,
          logo: createDto.logo,
          font: createDto.font,
          fontSize: createDto.fontSize,
          imageCarousel: createDto.imageCarousel || [],
          themeId: createDto.themeId,
        },
        include: {
          theme: true,
        },
      });

      return uiConfig;
    } catch (error) {
      throw new RpcException({
        status: error.status || 500,
        message: error.message || 'Error al crear configuración UI',
      });
    }
  }

  async findByBusinessId(businessId: string) {
    try {
      const uiConfig = await this.prisma.uIConfiguration.findUnique({
        where: { businessId },
        include: {
          theme: true,
        },
      });

      if (!uiConfig) {
        throw new NotFoundException(
          `No se encontró configuración para el negocio ${businessId}`,
        );
      }

      return uiConfig;
    } catch (error) {
      throw new RpcException({
        status: error.status || 500,
        message: error.message || 'Error al buscar configuración UI',
      });
    }
  }

  async update(businessId: string, updateDto: UpdateUIConfigurationDto) {
    try {
      const existing = await this.prisma.uIConfiguration.findUnique({
        where: { businessId },
      });

      if (!existing) {
        throw new NotFoundException(
          `No se encontró configuración para el negocio ${businessId}`,
        );
      }

      if (updateDto.themeId) {
        const themeExists = await this.prisma.theme.findUnique({
          where: { id: updateDto.themeId },
        });

        if (!themeExists) {
          throw new NotFoundException(
            `El tema con id ${updateDto.themeId} no existe`,
          );
        }
      }

      const uiConfig = await this.prisma.uIConfiguration.update({
        where: { businessId },
        data: {
          ...(updateDto.brand !== undefined && { brand: updateDto.brand }),
          ...(updateDto.logo !== undefined && { logo: updateDto.logo }),
          ...(updateDto.font && { font: updateDto.font }),
          ...(updateDto.fontSize && { fontSize: updateDto.fontSize }),
          ...(updateDto.imageCarousel && {
            imageCarousel: updateDto.imageCarousel,
          }),
          ...(updateDto.themeId && { themeId: updateDto.themeId }),
        },
        include: {
          theme: true,
        },
      });

      return uiConfig;
    } catch (error) {
      throw new RpcException({
        status: error.status || 500,
        message: error.message || 'Error al actualizar configuración UI',
      });
    }
  }

  async remove(businessId: string) {
    try {
      const existing = await this.prisma.uIConfiguration.findUnique({
        where: { businessId },
      });

      if (!existing) {
        throw new NotFoundException(
          `No se encontró configuración para el negocio ${businessId}`,
        );
      }

      await this.prisma.uIConfiguration.delete({
        where: { businessId },
      });

      return { message: 'Configuración eliminada correctamente' };
    } catch (error) {
      throw new RpcException({
        status: error.status || 500,
        message: error.message || 'Error al eliminar configuración UI',
      });
    }
  }
}
