const app = require('express')
const router = app.Router()
const motorSwitchController = require('../controller/motorSwitch-controller')
const checktoken = require('../middleware/checktoken')

router.use(checktoken)

router.put('/:uid/controlMotor',
motorSwitchController.controlMotor)

router.get('/:uid/getMotorStatus',
motorSwitchController.getMotorStatus)

module.exports =router