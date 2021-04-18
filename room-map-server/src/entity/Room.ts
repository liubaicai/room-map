import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  origin: string;

  @Column()
  url: string;

  @Column()
  code: string;

  @Column({ type: 'timestamp' })
  publish_time: Date;

  // ===================================

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  price_per_sqm: number;

  @Column({ type: 'simple-array' })
  price_type: string[];

  @Column({ type: 'simple-array' })
  price_rent: string[];

  @Column({ type: 'simple-array' })
  price_deposit: string[];

  @Column({ type: 'simple-array' })
  price_service: string[];

  @Column({ type: 'simple-array' })
  price_agent: string[];

  // ===================================

  @Column()
  position_district: string;

  @Column()
  position_region: string;

  @Column()
  position_community: string;

  @Column({ type: 'decimal' })
  position_longitude: number;

  @Column({ type: 'decimal' })
  position_latitude: number;

  // ===================================

  @Column()
  lease_type: string;

  // ===================================

  @Column()
  house_layout: string;

  @Column({ type: 'int' })
  house_area: number;

  @Column()
  house_face: string;

  @Column()
  house_floor: string;

  @Column()
  house_lift: string;

  @Column()
  house_water: string;

  @Column()
  house_electric: string;

  @Column()
  house_gas: string;

  @Column()
  house_heating: string;

  // ===================================

  @Column({ type: 'timestamp' })
  create_time: Date;

  @Column({ type: 'timestamp' })
  update_time: Date;
}
