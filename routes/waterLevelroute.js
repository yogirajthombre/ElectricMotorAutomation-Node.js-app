const app = require('express')
const router = app.Router()
const waterlevelController = require('../controller/waterLevel-controller')
const checktoken = require('../middleware/checktoken')

router.use(checktoken)

router.get('/:uid/getWaterlevel',
waterlevelController.currentwaterlevel)

router.put('/:uid/updateWaterlevel',
waterlevelController.updatewaterlevel)


module.exports = router;