import { Arg, ID, Query, Mutation } from 'type-graphql'
import { Movie } from './movie.entity'
import { MovieInput } from './movie.input'

export default class MovieResolver {
	@Query(() => Movie)
	async movie(@Arg('id', () => ID) id: string): Promise<Movie | undefined> {
		return Movie.findOne(id)
	}

	@Query(() => [Movie])
	async movies(): Promise<Movie[] | undefined> {
		return Movie.find()
	}

	@Mutation(() => Movie)
	async createMovie(
		@Arg('input', () => MovieInput) input: MovieInput,
	): Promise<Movie> {
		const movie = await Movie.create(input).save()

		return movie
	}
}
