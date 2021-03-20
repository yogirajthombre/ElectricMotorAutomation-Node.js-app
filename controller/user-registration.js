const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')


const register_user = async(request,response,next)=>{

    const {phoneNumber,password} = request.body
   
    try{
        identifiedUser = await Users.findOne({phoneNumber:phoneNumber});
    }catch(error){
        response.status(500);
        return response.json({
           message: `Database error: ${error.message}`,
           data: null,
           errors: true,
           status: 500,
    });
    }


    if (identifiedUser) {
        response.status(200);
        return response.json({
          status: 200,
          message: "PhoneNumber already exists",
          errors: true,
          data: null,
        });
    } 

   

    const encrpted_password = await bcrypt.hash(password, 11);


   newUser = Users({
        _id:new mongoose.Types.ObjectId,
        phoneNumber:phoneNumber,
        password:encrpted_password
    });
    
      try {
        await newUser.save();
      } catch (err) {
        response.status(500);
        return response.json({
          message: `Database error: ${err.message}`,
          data: null,
          errors: true,
          status: 500,
        });
      } 

    const jwt_token = jwt.sign({_id:newUser._id,phoneNumber:newUser.phoneNumber},process.env.JWT_KEY)

    response.status(200)
    response.json({
    status: 200,
    message: "Registration successful",
    data: {
      user: {
        _id: newUser._id,
        phoneNumber: newUser.phoneNumber,
      },
      token: jwt_token,
    },
    errors: false,
    })
  
}

const login_user = async(request,response,next) => {
    const {phoneNumber,password} = request.body

   let identifiedUser
    try{
        identifiedUser = await Users.findOne({ phoneNumber:phoneNumber});
    } catch (error) {
        response.status(500);
        return response.json({
           message: `Database error: ${error.message}`,
           data: null,
           errors: true,
           status: 500,
    }); }
   
    if (!identifiedUser){
      response.status(401)
      response.json({
        status:401,
        message:"PhoneNumber is incorrect",
        errors:true
      })
      }else{
      isValidPassword = await bcrypt.compare(
        password,
        identifiedUser.password.toString()
      )
      if (isValidPassword){

        const jwt_token = jwt.sign({_id:identifiedUser._id,phoneNumber:identifiedUser.phoneNumber},process.env.JWT_KEY)

        
        response.status(200)
        response.json({
        status: 200,
        message: "Login successful",
        data: {
          user: {
            _id: identifiedUser._id,
            phoneNumber: identifiedUser.phoneNumber,
          },
          token: jwt_token,
        },
        errors: false,
        })
   }else {
    response.status(401)
    response.json({
      status:401,
      message:"Password is incorrect",
      errors:true
    })
   }
    }

}

exports.register_user = register_user
exports.login_user = login_user