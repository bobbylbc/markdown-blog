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
		characteristics: Object,
		specialCharacteristics: Object
	},
	{
		timestamps: true
	}
)

const ShipRegistry = mongoose.model('ShipRegistry', shipRegistrySchema)
ShipRegistry.get = (callback, limit) => {
	ShipRegistry.find(callback).limit(limit)
}
module.exports = {
	ShipRegistry: mongoose.model('ShipRegistry', shipRegistrySchema)
}
