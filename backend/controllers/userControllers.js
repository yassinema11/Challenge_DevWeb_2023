const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')




//@desc Register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => 
{
    const {name, email, password} = req.body
    if(!name || !password || !email)
    {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exist
    const userExists = await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error('User already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword
        })

        if(user)
        {
            res.status(201).json(
                {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                }
            )
        }
        else
        {
            res.status(400)
            throw new Error('Invalid User Data')
        }

    res.json({message: 'Register User'})
})




//@desc Authnicate a user
//@route POST /api/login
//@access Public
const loginUser = asyncHandler(async (req, res) => 
{
    const {email, password} = req.body

    //check
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json(
        {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid Creadentials')
    }

    res.json({message: 'Login User'})
})




//@desc Get user data
//@route GET /api/users
//@access Public
const getMe = asyncHandler(async(req, res) => 
{
    res.json({message: 'User data display'})
})


//generate JWT 
const generateToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET,
    {
        expiresIn: '30d',
    })
}


module.exports = 
{
    registerUser,
    loginUser,
    getMe
}