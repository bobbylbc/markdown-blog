const mongoose = require('mongoose')
// Setup schema
const shipRegistrySchema = mongoose.Schema(
	{
		vesselCode: String,
		vesselName: String,
		vesselType: String,
		imo: String,
		yearBuilt: String,
		availability: String,
		loa: String,
		breadth: Number,
		maxDraft: Number,
		grossTonnage: Number,
		netTonnage: Number,
		deadweightTonnage: Number,
		flag: Number,
		class: String,
		portOfRegistry: String,
		statusOfVessel: String,
		new_field: String,
		characteristics: Object,
		specialCharacteristics: Object
	},
	{
		timestamps: true
	}
)

// shipRegistrySchema.pre('validate', function validate() {
// if (this.title) {
// 	this.slug = slugify(this.title, { lower: true, strict: true })
// }
// if (this.markdown) {
// 	this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
// }
// })

const ShipRegistry = mongoose.model('ShipRegistry', shipRegistrySchema)
ShipRegistry.get = (callback, limit) => {
	ShipRegistry.find(callback).limit(limit)
}
module.exports = {
	ShipRegistry: mongoose.model('ShipRegistry', shipRegistrySchema),
	shipRegistryFieldNames: [
		'vesselCode',
		'vesselName',
		'vesselType',
		'imo',
		'yearBuilt',
		'availability',
		'loa',
		'breadth',
		'maxDraft',
		'grossTonnage',
		'netTonnage',
		'deadweightTonnage',
		'flag',
		'class',
		'portOfRegistry',
		'statusOfVessel',
		'characteristics',
		'new_field',
		'specialCharacteristics'
	]
}

// module.exports.get = (callback, limit) => {
// 	Contact.find(callback).limit(limit)
// }
