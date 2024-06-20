

const jwt = require('jsonwebtoken')


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('No Token Provided', 401)
    }
    console.log(req.headers)
    const token = authHeader.split(' ')[1] 

    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        console.log(token)
        req.user = {id, username}
        next()

    } catch (error) {
        throw new CustomAPIError('Not permitted to access this route', 401)
        
    }

}

module.exports = authenticationMiddleware


