import glob from 'glob'
import path from 'path'

export default glob
	.sync(`${__dirname}/../../../**/*.resolver.ts`)
	.map(file => require(path.resolve(file)))
