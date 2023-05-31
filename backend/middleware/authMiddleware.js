const jwt = require ('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next)=>
{
    let token

    if(req.headers.authorization && req.header.authorization.startsWith('yassine'))
    {
        try
        {
            //get token
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }
        catch(error)
        {
            console.log(error)
            res.status(401)
            throw new Error ('Not Authrized')
        }
    }

    if(!token)
    {
        res.status(401)
        throw new Error ('Not Authrized ,no Token')
    }
})

module.exports = {protect}