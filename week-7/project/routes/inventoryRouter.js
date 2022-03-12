const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')
const { uuid } = require('uuidv4');
const { schema } = require('../models/inventory.js');



//Get All
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})

//Get one    
inventoryRouter.get('/:itemId', (req, res, next) => {
    Inventory.findOne(
        { _id: req.params.itemId},
        (err, getOneInventory) => {
            if(err){
              res.status(500)
              return next(err)
            }
            return res.status(200).send(getOneInventory)
        }
    )
})

  // Get by scent
  inventoryRouter.get("/search/scent", (req, res, next) => {
    const scent = req.query.scent
    if(!scent){
      const error = new Error("You must provide a scent")
      res.status(500)
      return next(error)
    }
    const filteredCandle = Inventory.filter(item => item.scent === scent)
    return res.status(200).send(filteredCandle)
  })

    // Get by title
    inventoryRouter.get("/search/title", (req, res, next) => {
      const title = req.query.title
      if(!title){
        const error = new Error("You must provide a title")
        res.status(500)
        return next(error)
      }
      const filteredCandle = Inventory.filter(item => item.title === title)
      return res.status(200).send(filteredCandle)
    })

  //Post
inventoryRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  const newItem = new Inventory(req.body)
  newItem.save((err, savedInventory) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(200).send(savedInventory)
  }) 
})

//Add Many Candles
inventoryRouter.post('/manycandles', (req, res, next) => {
  const Candles = req.body
  const newCandle = new Inventory(Candles)
  Inventory.insertMany(Candles, (err, savedInventory) => {
    if(err){
      res.status(500)
      return next(err)
  }
  return res.status(200).send(savedInventory)
  })
})

//Put/Update
inventoryRouter.put("/:itemId", (req, res, next) => {
    Inventory.findOneAndUpdate(
      { _id: req.params.itemId},
      req.body,
      {new: true},
      (err, updatedInventory) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedInventory)
      }
    )  
  })

//Delete One
inventoryRouter.delete("/:itemId", (req, res, next) => {
    Inventory.findOneAndDelete(
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

module.exports = inventoryRouter;

