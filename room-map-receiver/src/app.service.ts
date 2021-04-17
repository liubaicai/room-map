import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Room } from './entity/Room';
import { Resp } from './model/Resp';

@Injectable()
export class AppService {
  constructor(private connection: Connection) {}

  getHello(): Resp {
    return {
      code: 0,
      message: 'Hello World!',
      data: null,
    };
  }

  async getRoomsCount(): Promise<number> {
    const repo = this.connection.getRepository(Room);
    const count = await repo.count();
    return count;
  }

  async saveRoom(createRoom: Room): Promise<Room> {
    const repo = this.connection.getRepository(Room);
    const room = await repo.findOne({
      where: {
        code: createRoom.code,
      },
    });
    const time = new Date();
    if (room) {
      createRoom.id = room.id;
      createRoom.update_time = time;
      return repo.save(createRoom);
    } else {
      createRoom.create_time = time;
      createRoom.update_time = time;
      return repo.save(createRoom);
    }
  }
}
