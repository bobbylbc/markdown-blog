const router = require('express').Router()
// Set default API response
router.get('/', (req, res) => {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to RESTHub crafted with love!'
	})
})

const shipRegistryController = require('../controller/shipRegistry')

router.route('/shipRegistry').get(shipRegistryController.index).post(shipRegistryController.new)
router
	.route('/shipRegistry/:id')
	.get(shipRegistryController.view)
	.patch(shipRegistryController.update)
	.put(shipRegistryController.update)
	.delete(shipRegistryController.delete)
router.route('/shipRegistry/findByVesselCode/:vessel_code').get(shipRegistryController.findByVesselCode)

module.exports = router
