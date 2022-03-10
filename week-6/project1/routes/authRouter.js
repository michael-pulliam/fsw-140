const express = require('express')
const authRouter = express.Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
//Get All
authRouter.get('/', (req, res, next) => {
  User.find((err, users) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(200).send(users)
  })
})

//Get One
authRouter.get('/:itemId', (req, res, next) => {
  User.findOne(
      { _id: req.params.itemId},
      (err, getOneUser) => {
          if(err){
            res.status(500)
            return next(err)
          }
          return res.status(200).send(getOneUser)
      }
  )
})
//Put/Update
authRouter.put("/:itemId", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.itemId},
    req.body,
    {new: true},
    (err, updatedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedUser)
    }
  )  
})
// Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
                            // payload,            // secret
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser.withoutPassword() })
    })
  })
})

// Login
authRouter.post("/login", (req, res, next) => {
  const failedLogin = 'User or Password is Incorrect'
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      res.status(403)
      return next(new Error(failedLogin))
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if(err) {
        res.status(403)
        return next(new Error(failedLogin))
      }
      if(!isMatch){
        res.status(403)
        return next(new Error(failedLogin))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })
    })
  })
})


module.exports = authRouter