import { Resolver, Query, Arg } from 'type-graphql'
import { HelloInput } from './hello.input'

@Resolver()
export default class HelloResolver {
	@Query(() => String)
	hello(@Arg('input', () => HelloInput) input: HelloInput) {
		return `Hello ${input.name}`
	}
}
