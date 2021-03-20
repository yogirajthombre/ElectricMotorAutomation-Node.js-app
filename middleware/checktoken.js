const jwt = require('jsonwebtoken')


module.exports = (request,response,next) =>{
    try {
     const token = request.header("Authorization")
    if (!token){
        return response.json({
        message: "Invalid token",
        data: null,
        errors: true,
        status: 401
            })
    }
    
    const data = jwt.verify(token, process.env.JWT_KEY);
    request.tokendata = { tokenid : data._id,tokenphoneNumber : data.phoneNumber}
    next();
    } catch (error) {
    
            return response.json({
            message: "Authorization token error"+error,
            data: null,
            errors: true,
            status: 401
                })
    }

}