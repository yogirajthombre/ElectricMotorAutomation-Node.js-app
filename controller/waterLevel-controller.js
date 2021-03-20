const mongoose = require('mongoose')
const Users = require("../models/Users")
const WaterLevel = require("../models/WaterLevel")

const currentwaterlevel = async(request,response,next)=>{
    const userid = request.params.uid
    if (request.tokendata.tokenid != userid){
        return response.json({
            'status':401,
            'message':'UnAuthorized Access',
            'errors':true
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
            return response.json({
                status:200,
                message:'Current water level',
                data : {
                    waterLevel: water_level.waterLevel
                        },
                errors:false
        })
 


            
        }

    }
    
  


}

const updatewaterlevel = async(request,response,next)=>{
    const { currentwaterlevel } = request.body
    const userid = request.params.uid
    if (request.tokendata.tokenid != userid){
        return response.json({
            'status':401,
            'message':'UnAuthorized Access',
            'errors':true
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
    water_level_id = users.waterLevel

    if (water_level_id.length == 0){
        /// first time user ;
        const newWaterlevel = new WaterLevel({
            _id:new mongoose.Types.ObjectId,
            isMotorRunning:true,
            waterLevel:"0.0"
        })

         
    try {
        users.waterLevel = newWaterlevel
        await newWaterlevel.save()
        await users.save()
        } catch (error) {
          response.status(500);
          return response.json({
            message: `Database error: ${error.message}`,
            data: null,
            errors: true,
            status: 500,
          });
        }
        
    
        return response.json({
            status:404,
            message:"Water Level is currently unavailable",
            errors:true
    })
    
}else {

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
try{
    water_level.waterLevel = currentwaterlevel
    await water_level.save()
    return response.json({
        status:200,
        message:"Water Level Updated Sucessfully",
        data : {
            waterLevel: water_level.waterLevel
                },
        errors:true
})
    } catch (error) {
        response.status(500);
        return response.json({
        message: `Database error: ${error.message}`,
        data: null,
        errors: true,
        status: 500,
          });
        }

    }else {

    }
    }
}else {
    response.status(401)
    response.json({
      status:401,
      message:"User not found",
      errors:true
    })
}
}

exports.updatewaterlevel = updatewaterlevel
exports.currentwaterlevel = currentwaterlevel