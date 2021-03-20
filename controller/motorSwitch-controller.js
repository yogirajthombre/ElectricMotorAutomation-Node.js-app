const mongoose = require('mongoose')
const Users = require("../models/Users")
const WaterLevel = require("../models/WaterLevel")

const controlMotor = async(request,response,next)=>{
    
    const userid = request.params.uid
    if (request.tokendata.tokenid != userid){
        return response.json({
            status:401,
            message:'UnAuthorized Access',
            errors:true
        })
    }
    try {
        users = await Users.findById(userid)
        } catch (error) {
        return response.json({
                status:500,
                message:"Database error"+error,
                errors:true
        })
    }

    if (users){
    let water_level_id = []
    water_level_id = users.waterLevel[0]

    if (water_level_id){
        try {
            water_level = await WaterLevel.findById(water_level_id)
            } catch (error) {
             return response.json({
                    status:500,
                    message:"Database error"+error,
                    errors:true
            })
        }
      
        if (water_level){
            if (water_level.isMotorRunning){
                water_level.isMotorRunning = false;
            }else {
                water_level.isMotorRunning = true;
            }

        try {
            await water_level.save()
            response.status(200)
            response.json({
                status:200,
                message:"Sucessfully switched motor",
                data:{
                    isMotorRunning:water_level.isMotorRunning
                },
                errors:false
            })
        } catch (error) {
            response.status(401)
            response.json({
                status:401,
                message:"Unable to Switch motor operation"+error,
                errors:true
            })
            
        }

        
        }
    }

}
    
}

const getMotorStatus = async(request,response,next) =>{
    const userid = request.params.uid
    if (request.tokendata.tokenid != userid){
        return response.json({
            status:401,
            message:'UnAuthorized Access',
            errors:true
        })
    }
    try {
        users = await Users.findById(userid)
        } catch (error) {
        return response.json({
                status:500,
                message:"Database error"+error,
                errors:true
        })
    }

    if (users){
    let water_level_id = []
    water_level_id = users.waterLevel[0]

    if (water_level_id){
        try {
            water_level = await WaterLevel.findById(water_level_id)
            } catch (error) {
             return response.json({
                    status:500,
                    message:"Database error"+error,
                    errors:true
            })
        }

        response.status(200)
        response.json({
                status:200,
                message:"Current motor status",
                data:water_level.isMotorRunning,
                errors:false
            })
    }
}

}

exports.controlMotor = controlMotor
exports.getMotorStatus =getMotorStatus