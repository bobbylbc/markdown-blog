const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const config = require('config')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const apiRouter = require('./routes/api')

console.debug('config: ', config.get('app'), config.get('db'))
const _appPort = config.get('app.port')
const _dbUrl = config.get('db.url')

const app = express()

mongoose.connect(_dbUrl, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
})

app.set('view engine', 'ejs')
app.set('port', _appPort)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc' })
	res.render('articles/index', { articles })
})

app.use('/articles', articleRouter)
app.use('/api', apiRouter)
app.listen(_appPort)
