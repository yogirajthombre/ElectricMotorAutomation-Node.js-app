const { check } = require('express-validator')

const AuthenticateUserRegistrationAndLogin = ()=>{

   return [check('phoneNumber').notEmpty(),
    check('password').notEmpty(),
    ]
}

exports.AuthenticateUserRegistrationAndLogin = AuthenticateUserRegistrationAndLogin



