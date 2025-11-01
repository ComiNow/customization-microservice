import {
  IsString,
  IsInt,
  IsArray,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';

export class UpdateUIConfigurationDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  font?: string;

  @IsInt()
  @Min(10)
  @IsOptional()
  fontSize?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageCarousel?: string[];

  @IsInt()
  @IsOptional()
  themeId?: number;
}
