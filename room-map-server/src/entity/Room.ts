import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  code: string;

  @Column({ type: 'timestamp', nullable: true })
  publish_time: Date;

  // ===================================

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  // ===================================

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ type: 'float', nullable: true })
  price_per_sqm: number;

  @Column({ type: 'simple-array', nullable: true })
  price_type: string[];

  @Column({ type: 'simple-array', nullable: true })
  price_rent: string[];

  @Column({ type: 'simple-array', nullable: true })
  price_deposit: string[];

  @Column({ type: 'simple-array', nullable: true })
  price_service: string[];

  @Column({ type: 'simple-array', nullable: true })
  price_agent: string[];

  // ===================================

  @Column({ nullable: true })
  position_district: string;

  @Column({ nullable: true })
  position_region: string;

  @Column({ nullable: true })
  position_community: string;

  @Column({ type: 'decimal', nullable: true })
  position_longitude: number;

  @Column({ type: 'decimal', nullable: true })
  position_latitude: number;

  // ===================================

  @Column({ nullable: true })
  lease_type: string;

  // ===================================

  @Column({ nullable: true })
  house_layout: string;

  @Column({ type: 'int', nullable: true })
  house_area: number;

  @Column({ nullable: true })
  house_face: string;

  @Column({ nullable: true })
  house_floor: string;

  @Column({ nullable: true })
  house_lift: string;

  @Column({ nullable: true })
  house_water: string;

  @Column({ nullable: true })
  house_electric: string;

  @Column({ nullable: true })
  house_gas: string;

  @Column({ nullable: true })
  house_heating: string;

  // ===================================

  @Column({ type: 'timestamp', nullable: true })
  create_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  update_time: Date;
}
