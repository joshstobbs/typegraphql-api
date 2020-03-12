import { Field, InputType } from 'type-graphql'

@InputType()
export class MovieInput {
	@Field()
	name: string
}
