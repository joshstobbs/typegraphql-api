import { Arg, Ctx, Mutation, Query, Int } from 'type-graphql'
import { compare } from 'bcryptjs'
import { verify } from 'jsonwebtoken'
import { getConnection } from 'typeorm'
import { AuthInput } from './auth.input'
import { User } from '../user/user.entity'
import { LoginResponse } from './auth.type'
import { AuthContext } from '../../core/auth/AuthContext'
import {
	sendRefreshToken,
	createRefreshToken,
	createAccessToken,
} from '../../core/auth'

export class AuthResolver {
	@Mutation(() => Boolean)
	async register(@Arg('input') { email, password }: AuthInput) {
		try {
			await User.insert({ email, password })
		} catch (error) {
			console.log(error)

			return false
		}

		return true
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg('input') { email, password }: AuthInput,
		@Ctx() { res }: AuthContext,
	): Promise<LoginResponse> {
		const user = await User.findOne({ where: { email } })

		if (!user) {
			throw new Error('User not found.')
		}

		const valid = await compare(password, user.password)

		if (!valid) {
			throw new Error('Password is invalid')
		}

		sendRefreshToken(res, createRefreshToken(user))

		return {
			accessToken: createAccessToken(user),
			user,
		}
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() { res }: AuthContext) {
		sendRefreshToken(res, '')

		return true
	}

	@Mutation(() => Boolean)
	async revokeRefreshToken(@Arg('userId', () => Int) userId: number) {
		await getConnection()
			.getRepository(User)
			.increment({ id: userId }, 'tokenVersion', 1)

		return true
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() context: AuthContext) {
		const authorization = context.req.headers['authorization']

		if (!authorization) {
			return null
		}

		try {
			const token = authorization.split(' ')[1]
			const payload: any = verify(token, process.env.JWT_SECRET!)

			return User.findOne(payload.userId)
		} catch (error) {
			console.log(error)

			return null
		}
	}
}
