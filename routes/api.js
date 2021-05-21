const router = require('express').Router()
// Set default API response
router.get('/', (req, res) => {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to RESTHub crafted with love!'
	})
})

const contactController = require('../controller/contact')

router.route('/contacts').get(contactController.index).post(contactController.new)
router.route('/contacts/:contact_id').get(contactController.view).patch(contactController.update).put(contactController.update).delete(contactController.delete)

const shipRegistryController = require('../controller/shipRegistry')

router.route('/shipRegistry').get(shipRegistryController.index).post(shipRegistryController.new)
router
	.route('/shipRegistry/:id')
	.get(shipRegistryController.view)
	.patch(shipRegistryController.update)
	.put(shipRegistryController.update)
	.delete(shipRegistryController.delete)

module.exports = router
