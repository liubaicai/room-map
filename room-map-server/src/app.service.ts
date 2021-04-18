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

  async searchRooms(
    page: number,
    size: number,
    body: any,
  ): Promise<[content: Room[], total: number, error?: string]> {
    const repo = this.connection.getRepository(Room);
    const searcher = repo.createQueryBuilder('room').select('room');

    Object.keys(body).forEach((key) => {
      if (key.startsWith('in_')) {
        const kk = key.slice(3);
        const arr = body[key].map((m) => `'${m}'`);
        searcher.andWhere(`room.${kk} IN (${[...arr]})`);
      } else if (key.startsWith('min_')) {
        const kk = key.slice(4);
        searcher.andWhere(`room.${kk} >= '${body[key]}'`);
      } else if (key.startsWith('max_')) {
        const kk = key.slice(4);
        searcher.andWhere(`room.${kk} <= '${body[key]}'`);
      } else {
        searcher.andWhere(`room.${key} = '${body[key]}'`);
      }
    });

    searcher
      .orderBy({
        update_time: 'DESC',
      })
      .skip(page * size)
      .take(size);

    try {
      const [rooms, count] = await searcher.getManyAndCount();
      return [rooms, count];
    } catch (error) {
      return [null, null, error.message];
    }
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
