
//all require data is here
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')


const register = (req, res, next) =>{
    let {username,
        name,
        email,
        password
    } = req.body

    var UserSchema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        name: Joi.string().required(),
        email: Joi.string().email(),
        password: Joi.string().regex(/[a-zA-Z0-9]{8,30}$/).required(),
        
        
    })

    const result = Joi.validate({
        username,
        name,
        email,
        password
    }, UserSchema, {abortEarly: false} )


    if (result.error){
        res.json({
            error: result.error.details.map(err=>{
                return err.massage
            })
        })
    }else{
        User.find({email: result.value.email})
            .then(users=>{
                if(users.length > 0){
                    res.json({
                        message: "User already exist"
                    })
                }else{
                    bcrypt.hash(result.value.password, 10, (err, hash)=>{
                        if(err){
                            res.json({
                                error:err
                            })
                        }
                        let newUser = new User({
                            username: result.value.username,
                            name: result.value.name,
                            email: result.value.email,
                            password: hash
                        })
                        newUser.save()
                                .then(user=>{
                                    res.json({
                                        user
                                    })
                                })
                                .catch(error=>{
                                    res.json({
                                        error:error
                                    })
                                })
                    })
                }
            })
            .catch(erroe=>{
                res.json({
                    errod:error
                })
            })


    }


}

// all register

const  allRegister = (req, res, next) => {

    User.find()
        .then(users=>{
            res.json({users})
        })
        .catch(error=>{
            res.json({
                error: error
            })
        })

}

// signIn
const signIn = (req, res, next) =>{

    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                res.json({
                    message: "User not found"
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(!result){
                    res.json({
                        
                            message: "password not mass"
                       
                    })
                }
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    username: user.username
                }, 'SECRET', {expiresIn: '2h'})
                res.json({
                    message: "Login Successfully",
                    token: `Bearer ${token}`
                })
            })
        })
        .catch(error=>{
            res.json({
                error:error
            })
        })
}



module.exports = {
    register,
    allRegister,
    signIn

}
