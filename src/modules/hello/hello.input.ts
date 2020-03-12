import { InputType, Field } from 'type-graphql'

@InputType()
export class HelloInput {
	@Field()
	name: string
}
