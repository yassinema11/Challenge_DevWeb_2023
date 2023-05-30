const asyncHandler = require('express-async-handler')

// get all goals
//route get /api/goals
//access private 
const getGoals = asyncHandler(async (req, res) => 
{
    res.status(200).json({ message : 'Get Goals'})
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

    res.status(200).json({ message : 'set Goals'})
})


// update goals
//route update /api/goals
//access private 
const updateGoal = asyncHandler(async(req, res) => 
{
    res.status(200).json({message : `UPDATE GOALS ${req.params.id}`})
})

//route delete /api/goals
//access private 
const deleteGoal = asyncHandler(async(req, res) => 
{
    res.status(200).json({message : `DELETE GOALS ${req.params.id}`})
})


module.exports = 
{
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}