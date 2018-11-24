const router = require('express').Router()

const {
    register,
    allRegister,
    signIn
} = require('../controllers/userController')

// user register


// register route
router.post('/register', register)

//get all user
router.get('/', allRegister)

// login user
router.post('/signin', signIn)


module.exports = router