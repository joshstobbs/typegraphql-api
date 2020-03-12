import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Actor } from '../actor/actor.entity'

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	name: string
}
