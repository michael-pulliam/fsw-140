const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/Issue.js')
const { uuid } = require('uuidv4');
const { schema } = require('../models/Issue.js');




//Get All
issueRouter.get('/', (req, res, next) => {
    Issue.find((err, issue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })
})

//Get one    
issueRouter.get('/:itemId', (req, res, next) => {
    Issue.findOne(
        { _id: req.params.itemId},
        (err, getOneIssue) => {
            if(err){
              res.status(500)
              return next(err)
            }
            return res.status(200).send(getOneIssue)
        }
    )
})

  // Get by vote
  issueRouter.get("/search/vote", (req, res, next) => {
    const vote = req.query.upvote_downvote
    if(!vote){
      const error = new Error("You must provide a scent")
      res.status(500)
      return next(error)
    }
    const filteredIssue = Issue.filter(item => item.upvote_downvote === vote)
    return res.status(200).send(filteredIssue)
  })

    // Get by title
    issueRouter.get("/search/title", (req, res, next) => {
      const title = req.query.title
      if(!title){
        const error = new Error("You must provide a title")
        res.status(500)
        return next(error)
      }
      const filteredIssue = Issue.filter(item => item.title === title)
      return res.status(200).send(filteredIssue)
    })

  //Post
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedIssue)
  }) 
})


//Put/Update
issueRouter.put("/:itemId", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.itemId},
      req.body,
      {new: true},
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )  
  })

//Delete One
issueRouter.delete("/:itemId", (req, res, next) => {
    Issue.findOneAndDelete(
      {_id: req.params.itemId}, 
      (err, deletedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedIssue.title} from the database`)
      }
    )
  })

module.exports = issueRouter;