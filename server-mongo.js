const express = require('express')
const { MongoClient } = require('mongodb')
const methodOverride = require('method-override')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const app = express()

async function main() {
	const uri = 'mongodb+srv://db_admin2:Trvdw2TC92kWK1kI@cluster0.9ssgl.mongodb.net/shipyard-audit?retryWrites=true&w=majority'
	const client = new MongoClient(uri)
	try {
		await client.connect()

		await listDatabases(client)
	} catch (e) {
		console.error(e)
	} finally {
		await client.close()
	}
}

async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases()

	console.log('Databases:')
	databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
}

main().catch(console.error)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc' })
	res.render('articles/index', { articles })
})

app.use('/articles', articleRouter)
app.listen(5000)
