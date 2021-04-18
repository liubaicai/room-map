import { Room } from 'src/entity/Room';

export interface Resp {
  code: number;
  message: string;
  data?: RespData;
}

export interface RespData {
  total?: number;
  size?: number;
  page?: number;
  content?: Array<Room> | Room;
}
