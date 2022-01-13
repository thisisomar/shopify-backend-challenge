import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, Column, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string;
  
  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  quantity: number;

  @CreateDateColumn()
  @Field()
  created: Date

  @UpdateDateColumn()
  @Field()
  updated: Date
}