const router = new Router()

router.use('/account', require('./account'))
router.use('/info', require('./info'))

module.exports = router.routes()
