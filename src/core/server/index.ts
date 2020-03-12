import 'dotenv/config'
import 'reflect-metadata'
import express, { Request, Response } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { json } from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import createSchema from '../graphql'
import { refreshRoute } from '../auth'

const bootstrap = async () => {
	const app = express()
	const port = process.env.APP_PORT
	const host = process.env.APP_URL

	app.use(json())
	app.use(cors())
	app.use(cookieParser())

	app.get('/', (res: Response) => {
		return res.json({
			message: 'Hello',
		})
	})

	app.post('/refresh_token', async (req: Request, res: Response) =>
		refreshRoute(req, res),
	)

	await createConnection()

	const server = new ApolloServer({
		schema: await createSchema,
		context: ({ req, res }) => ({ req, res }),
	})

	server.applyMiddleware({ app, cors: false, bodyParserConfig: false })

	app.listen({ port, host }, () => {
		console.log(
			`✨  Server ready at http://${host}:${port}${server.graphqlPath}`,
		)
	})
}

export default bootstrap
