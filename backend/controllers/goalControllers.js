// get all goals
//route get /api/goals
//access private 
const getGoals = (req, res) => 
{
    res.status(200).json({ message : 'Get Goals'})
}

// set goal 
//route post  /api/goals
//access private 
const setGoal = (req, res) => 
{
    res.status(200).json({ message : 'set Goals'})
}

// update goals
//route update /api/goals
//access private 
const updateGoal = (req, res) => 
{
    res.status(200).json({message : `UPDATE GOALS ${req.params.id}`})
}

//route delete /api/goals
//access private 
const deleteGoal = (req, res) => 
{
    res.status(200).json({message : `DELETE GOALS ${req.params.id}`})
}


module.exports = 
{
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}