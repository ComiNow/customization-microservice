import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomizationService } from './customization.service';
import { CreateUIConfigurationDto } from './dto/create-ui-configuration.dto';
import { UpdateUIConfigurationDto } from './dto/update-ui-configuration.dto';

@Controller()
export class CustomizationController {
  constructor(private readonly customizationService: CustomizationService) {}

  @MessagePattern({ cmd: 'create_ui_configuration' })
  create(@Payload() createDto: CreateUIConfigurationDto) {
    return this.customizationService.create(createDto);
  }

  @MessagePattern({ cmd: 'find_ui_configuration_by_business' })
  findByBusiness(@Payload() data: { businessId: string }) {
    return this.customizationService.findByBusinessId(data.businessId);
  }

  @MessagePattern({ cmd: 'update_ui_configuration' })
  update(
    @Payload()
    data: {
      businessId: string;
      updateDto: UpdateUIConfigurationDto;
    },
  ) {
    return this.customizationService.update(data.businessId, data.updateDto);
  }

  @MessagePattern({ cmd: 'delete_ui_configuration' })
  remove(@Payload() data: { businessId: string }) {
    return this.customizationService.remove(data.businessId);
  }
}
