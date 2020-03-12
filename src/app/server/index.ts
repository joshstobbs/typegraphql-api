import express, { Response } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { json } from 'body-parser'
import cors from 'cors'

import createSchema from '../graphql'

const bootstrap = async () => {
	const app = express()
	const port = process.env.APP_PORT
	const host = process.env.APP_URL

	app.use(json())
	app.use(cors())

	app.get('/', (res: Response) => {
		return res.json({
			message: 'Hello',
		})
	})

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
