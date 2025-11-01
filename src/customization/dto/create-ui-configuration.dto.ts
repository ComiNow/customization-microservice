import {
  IsString,
  IsInt,
  IsArray,
  IsOptional,
  Min,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateUIConfigurationDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

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
  @IsNotEmpty()
  themeId: number;
}
