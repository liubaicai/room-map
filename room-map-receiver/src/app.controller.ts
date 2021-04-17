import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Room } from './entity/Room';
import { Resp } from './model/Resp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Resp {
    return this.appService.getHello();
  }

  @Get('rooms')
  async getRooms(): Promise<Resp> {
    const resp = {
      code: 0,
      message: 'success',
      data: await this.appService.getRoomsCount(),
    };
    return resp;
  }

  @Post('rooms')
  async postRooms(@Body() createRoom: Room): Promise<Resp> {
    await this.appService.saveRoom(createRoom);
    const resp = {
      code: 0,
      message: 'success',
      data: null,
    };
    return resp;
  }
}
