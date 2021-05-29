const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const config = require('config')
const history = require('connect-history-api-fallback')
const apiRouter = require('./routes/api')

require('dotenv').config({ path: `${__dirname}/.env.local` })

console.debug('** config->', config)

const APP_PORT = process.env.PORT || config.get('app.port')
const DB_URL = config.get('db.url')
const DB_USERNAME = process.env.MONGODB_USERNAME
const DB_PASSWORD = process.env.MONGODB_PASSWORD
let connectRetry = config.get('db.connectRetry') || 3

const self = this
const app = express()

self.connectToDB = async () => {
	try {
		await mongoose.connect(DB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			user: DB_USERNAME,
			pass: DB_PASSWORD
		})
	} catch (error) {
		console.error(error)
		console.warn('** Connect Retry left -> ', connectRetry)
		connectRetry -= 1
		if (error && connectRetry > 0) {
			await self.connectToDB()
		} else {
			throw error
		}
	}
}

self.initalize = async () => {
	await self.connectToDB()
	app.set('view engine', 'ejs')
	app.set('port', APP_PORT)

	app.use(express.urlencoded({ extended: false }))
	app.use(express.json())
	app.use(methodOverride('_method'))

	app.use('/api', apiRouter)

	// ====== Setup SPA static folder ========
	// const staticFileMiddleware = express.static('static/www')
	// app.use(staticFileMiddleware)
	// app.use(
	// 	history({
	// 		disableDotRule: true,
	// 		index: '/index.html',
	// 		verbose: true,
	// 		logger: console.log.bind(console)
	// 	})
	// )
	// app.use(staticFileMiddleware)
	// ========================================

	app.listen(APP_PORT, () => {
		console.debug(`** App started at port ${APP_PORT}`)
	})
}

self.initalize()
