import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinTable,
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

	@Field(() => [Actor])
	@ManyToMany(
		() => Actor,
		actor => actor.movies,
		{
			lazy: true,
		},
	)
	@JoinTable({ name: 'actor_movies' })
	actors: Actor[]
}
