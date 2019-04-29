const router = new Router()

router.use('/sports', require('./sports'))
router.use('/social', require('./social'))

module.exports = router.routes()
