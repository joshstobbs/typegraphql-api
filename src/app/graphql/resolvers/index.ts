import glob from 'glob'
import path from 'path'

export default glob
	.sync(`${__dirname}/../../../**/*.resolver.ts`)
	.map(file => require(path.resolve(file)))

// import fs from 'fs'
// import path from 'path'

// export default fs.readdirSync(__dirname).map(file => {
// 	const { name } = path.parse(file)

// 	return require(`./${name}.ts`)
// })
