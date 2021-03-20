const app = require('express')
const router = app.Router()
const userRegistrationController =
 require('../controller/user-registration')

const { AuthenticateUserRegistrationAndLogin } = 
require('../validation/userRegistration-validation')

const { validate } = 
require('../validation/common-validation')

router.post('/register',
AuthenticateUserRegistrationAndLogin(),
validate,
userRegistrationController.register_user)

router.post('/login',
AuthenticateUserRegistrationAndLogin(),
validate,
userRegistrationController.login_user)

module.exports = router;
