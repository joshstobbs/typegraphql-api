import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
} from 'typeorm'
import { ObjectType, Field, ID, Int } from 'type-graphql'
import bcrypt from 'bcryptjs'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@Column()
	name: string

	@Field()
	@Column()
	email: string

	@Column()
	password: string

	@Field(() => Int)
	@Column('int', { default: 0 })
	tokenVersion: number

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 12)
	}
}
