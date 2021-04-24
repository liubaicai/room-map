import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('count')
  async countRooms(): Promise<Resp> {
    const count = await this.appService.getRoomsCount();
    const resp = {
      code: 0,
      message: 'success',
      data: count,
    };
    return resp;
  }

  @Post('search')
  async getRooms(@Query() query, @Body() searchBody): Promise<Resp> {
    const page = parseInt(query.page, 10) || 0;
    const size = parseInt(query.size, 10) || 10;
    const [content, total, error] = await this.appService.searchRooms(
      page,
      size,
      searchBody,
    );
    if (error) {
      return {
        code: 500,
        message: error,
      };
    }
    const resp = {
      code: 0,
      message: 'success',
      data: {
        page: page,
        size: size,
        total: total,
        content: content,
      },
    };
    return resp;
  }
}
