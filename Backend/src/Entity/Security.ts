import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export class Security {
  @PrimaryColumn()
  ticker!: string;

  @Column()
  security_name!: string;

  @Column()
  sector!: string;

  @Column()
  country!: string;

  @Column("decimal")
  trend!: number;

  @Column("jsonb")
  prices!: any;
}
