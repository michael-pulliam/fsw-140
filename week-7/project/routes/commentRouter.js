const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment.js')
const { uuid } = require('uuidv4');
const { schema } = require('../models/Comment.js');



//Get All
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

//Get one    
commentRouter.get('search/:itemId', (req, res, next) => {
    Comment.findOne(
        { _id: req.params.itemId},
        (err, getOneComment) => {
            if(err){
              res.status(500)
              return next(err)
            }
            return res.status(200).send(getOneComment)
        }
    )
})
//Get by User
commentRouter.get('/user', (req, res, next) => {
  Comment.find(
      { user: req.user._id},
      (err, getComment) => {
          if(err){
            res.status(500)
            return next(err)
          }
          return res.status(200).send(getComment)
      }
  )
})

    // Get by title
    commentRouter.get("/search/title", (req, res, next) => {
      const title = req.query.title
      if(!title){
        const error = new Error("You must provide a title")
        res.status(500)
        return next(error)
      }
      const filteredComment = Comment.filter(item => item.title === title)
      return res.status(200).send(filteredComment)
    })

  //Post
commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
  const newItem = new Comment(req.body)
  newItem.save((err, savedComment) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(200).send(savedComment)
  }) 
})

//Add Many Candles
// inventoryRouter.post('/manycomment', (req, res, next) => {
//   const Candles = req.body
//   const newCandle = new Inventory(Candles)
//   Inventory.insertMany(Candles, (err, savedInventory) => {
//     if(err){
//       res.status(500)
//       return next(err)
//   }
//   return res.status(200).send(savedInventory)
//   })
// })

//Put/Update
commentRouter.put("/:itemId", (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.itemId},
      req.body,
      {new: true},
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
      }
    )  
  })

//Delete One
commentRouter.delete("/user/:itemId", (req, res, next) => {
    Comment.findOneAndDelete(
      {_id: req.params.itemId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
      }
    )
  })

module.exports = commentRouter;