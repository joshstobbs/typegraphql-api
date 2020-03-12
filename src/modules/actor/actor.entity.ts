import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { Movie } from '../movie/movie.entity'

@ObjectType()
@Entity()
export class Actor extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field()
	@Column()
	name: string

	@Field(() => [Movie])
	@ManyToMany(
		() => Movie,
		movie => movie.actors,
		{
			lazy: true,
		},
	)
	movies: Movie[]
}
