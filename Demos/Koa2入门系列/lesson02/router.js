const router = new Router()

router.use('/news', require('./news'))
router.use('/user', require('./user'))

module.exports = router.routes()
