import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Get(":id")
  @UseGuards(AuthGuard)
  findAll(@Request() requete, @Param("id") id: string) {

    return this.messageService.findAllMessagesfromSalon(id);
  }

  @Post()
  async create(@Body() createMessageDto: any) {
    return this.messageService.create(createMessageDto);
  }
}
