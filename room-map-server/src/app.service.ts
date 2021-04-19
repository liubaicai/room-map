import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Room } from './entity/Room';
import { Resp } from './model/Resp';

@Injectable()
export class AppService {
  constructor(private connection: Connection) {}

  roomKeys: string[] = [
    'id',
    'title',
    'origin',
    'url',
    'code',
    'publish_time',
    'price',
    'price_per_sqm',
    'price_type',
    'price_rent',
    'price_deposit',
    'price_service',
    'price_agent',
    'position_district',
    'position_region',
    'position_community',
    'position_longitude',
    'position_latitude',
    'lease_type',
    'house_layout',
    'house_area',
    'house_face',
    'house_floor',
    'house_lift',
    'house_water',
    'house_electric',
    'house_gas',
    'house_heating',
    'create_time',
    'update_time',
  ];

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

    if (Object.keys(body).length > 0) {
      const filters = [];
      const params = [];
      for (let index = 0; index < Object.keys(body).length; index++) {
        const key = Object.keys(body)[index];
        if (key.startsWith('in_')) {
          const kk = key.slice(3);
          if (this.roomKeys.indexOf(kk) > -1) {
            if (body[key] && body[key].length > 0) {
              params[key] = body[key];
              filters.push(`${kk} IN (:...${key})`);
            }
          }
        } else if (key.startsWith('min_')) {
          const kk = key.slice(4);
          if (this.roomKeys.indexOf(kk) > -1) {
            if (body[key]) {
              params[key] = body[key];
              filters.push(`${kk} >= :${key}`);
            }
          }
        } else if (key.startsWith('max_')) {
          const kk = key.slice(4);
          if (this.roomKeys.indexOf(kk) > -1) {
            if (body[key]) {
              params[key] = body[key];
              filters.push(`${kk} <= :${key}`);
            }
          }
        } else if (key.startsWith('like_')) {
          const kk = key.slice(5);
          if (this.roomKeys.indexOf(kk) > -1) {
            if (body[key]) {
              params[key] = `%${body[key]}%`;
              filters.push(`${kk} LIKE :${key}`);
            }
          }
        } else {
          if (this.roomKeys.indexOf(key) > -1) {
            if (body[key]) {
              params[key] = body[key];
              filters.push(`${key} = :${key}`);
            }
          }
        }
      }
      const sqLExpr = filters.join(` AND `);
      if (sqLExpr) {
        searcher.where(`(${sqLExpr})`, params);
      }
    }

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
