import { Field, InputType } from 'type-graphql'

@InputType()
export class ActorInput {
	@Field()
	name: string
}
