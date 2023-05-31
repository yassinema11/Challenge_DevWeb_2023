const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User  = require('../models/userModel')


// get all goals
//route get /api/goals
//access private 
const getGoals = asyncHandler(async (req, res) => 
{
    const goals = await Goal.find(
        {
            user: req.user.id
        })
    res.status(200).json(goals)
})


// set goal 
//route post  /api/goals
//access private 
const setGoal = asyncHandler(async (req, res) => 
{
    if(!req.body.text)
    {
        throw new Error('Please add a text');
    }

    const goal = await Goal.create(
        {
            text: req.body.text,
            user: req.body.id
        }
    )
    res.status(200).json(goal)
})


// update goals
//route update /api/goals
//access private 
const updateGoal = asyncHandler(async(req, res) => 
{
    const goal = await Goal.findById(req.params.id)
    if(!goal)
    {
        res.status(400)
        throw new Error('Goal Not Found');
    }
    const user = await User.findById(req.user.id)

    if(!user)
    {
        res.status(401)
        throw new Error('User not Found')
    }


    if(goal.user.toString() !== user.id)
    {
        res.status(401)
        throw new Error('User not Authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, 
        {
            new : true,
        })

    res.status(200).json(updateGoal)
})

//route delete /api/goals
//access private 
const deleteGoal = asyncHandler(async(req, res) => 
{
    const goal = await Goal.findById(req.params.id)
    if(!goal)   
    {
        res.status(400)
        throw new Error('Goal Not Found');
    }

    const user = await User.findById(req.user.id)

    if(!user)
    {
        res.status(401)
        throw new Error('User not Found')
    }


    if(goal.user.toString() !== user.id)
    {
        res.status(401)
        throw new Error('User not Authorized')
    }
    await goal.remove()

    res.status(200).json({id: req.params.id})
})


module.exports = 
{
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}