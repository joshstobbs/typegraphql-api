require('dotenv/config')

module.exports = {
	type: process.env.DB_CONNECTION,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	synchronize: process.env.DB_SYNCHRONIZE,
	logging: process.env.DB_LOGGING,
	entities: ['src/modules/**/*.entity.ts'],
	migrations: ['src/modules/**/*.migration.ts'],
	subscribers: ['src/modules/**/*.subscriber.ts'],
	cli: {
		entitiesDir: 'src/models',
		migrationsDir: 'src/database/migrations',
		subscribersDir: 'src/database/subscribers',
	},
}
