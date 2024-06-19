import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { SalonService } from './salon.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) { }

  @Get(":id")
  @UseGuards(AuthGuard)
  findAll(@Request() requete, @Param("id") id: string) {

    return this.salonService.findAllFromServer(id);
  }

  @Post()
  async create(@Body() createSalonDto: any) {
    return this.salonService.create(createSalonDto);
  }

  @Get('/possede')
  @UseGuards(AuthGuard)
  findAllSalonOfUser(@Request() requete) {
    return this.salonService.findAllSalonOfUser(requete.user.sub);
  }
}
