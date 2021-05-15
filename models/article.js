const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = createDomPurifier(new JSDOM().window)

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	description: {
		type: String
	},
	age: {
		type: Number
	},
	markdown: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	sanitizedHtml: {
		type: String,
		require: true
	}
})

articleSchema.pre('validate', function validate() {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true })
	}

	if (this.markdown) {
		this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
	}
})

module.exports = mongoose.model('Article', articleSchema)
