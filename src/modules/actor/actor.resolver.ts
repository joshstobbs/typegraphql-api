import { Arg, ID, Query, Mutation } from 'type-graphql'
import { Actor } from './actor.entity'
import { ActorInput } from './actor.input'

export default class ActorResolver {
	@Query(() => Actor)
	async actor(@Arg('id', () => ID) id: string): Promise<Actor | undefined> {
		return Actor.findOne(id)
	}

	@Query(() => [Actor])
	async actors(): Promise<Actor[] | undefined> {
		return Actor.find()
	}

	@Mutation(() => Actor)
	async createActor(
		@Arg('input', () => ActorInput) input: ActorInput,
	): Promise<Actor> {
		const actor = await Actor.create(input).save()

		return actor
	}
}
