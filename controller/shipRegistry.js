const e = require('express')
const { ShipRegistry, shipRegistryFieldNames } = require('../models/ShipRegistry')

const name = 'ShipRegistry'

exports.index = (req, res) => {
	ShipRegistry.get((err, records) => {
		if (err)
			res.json({
				status: 'error',
				message: err
			})
		else
			res.json({
				status: 'success',
				message: `${name} retrieved successfully`,
				data: records
			})
	})
}

exports.new = (req, res) => {
	const record = new ShipRegistry()
	shipRegistryFieldNames.forEach((field) => {
		if (req.body[field]) record[field] = req.body[field]
	})

	record.save((err) => {
		if (err) res.json(err)
		else
			res.json({
				message: `New ${name} record created!`,
				data: record
			})
	})
}

exports.view = (req, res) => {
	ShipRegistry.findById(req.params.id, (err, record) => {
		if (err) res.send(err)
		else
			res.json({
				message: `${name}: ${record._id} details loading..`,
				data: record
			})
	})
}

exports.findByVesselCode = (req, res) => {
	ShipRegistry.findOne({ vesselCode: req.params.vessel_code }, (err, record) => {
		if (err) res.send(err)
		else
			res.json({
				message: `${name}: ${record._id} details loading..`,
				data: record
			})
	})
}

exports.update = (req, res) => {
	ShipRegistry.findById(req.params.id, (err, record) => {
		if (err) res.send(err)
		shipRegistryFieldNames.forEach((field) => {
			if (req.body[field]) record[field] = req.body[field]
		})
		// save the record and check for errors
		record.save((error) => {
			if (error) res.json(error)
			else
				res.json({
					message: 'ShipRegistry Info updated',
					data: record
				})
		})
	})
}

exports.delete = (req, res) => {
	ShipRegistry.remove(
		{
			_id: req.params.id
		},
		(err, record) => {
			if (err) res.send(err)
			else
				res.json({
					status: 'success',
					message: `${req.params.id} deleted, ${record}`
				})
		}
	)
}
