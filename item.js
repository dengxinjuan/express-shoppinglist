
const express = require('express');
const router = new express.Router();
const ExpressError = require("./expressError");
var items = require("./fakeDb")

const checkItems = (req,res,next) =>{
    if(!req.body.name) throw new ExpressError('No Name', 404);
   if(!req.body.price) throw new ExpressError('No Price', 404);
   next()

}
//get all items

router.get('/', (req,res,next)=>{
    res.json(items)
})

//post single item to items route

router.post('/',checkItems, (req,res,next)=>{
   const newItem = {name: req.body.name, price: req.body.price};
   items.push(newItem)
   res.status(201).json({Added: newItem})
})

//get name by query


router.get('/:name',(req,res,next)=>{
    const found = items.find(r => r.name === req.params.name);
    if(found === undefined){
        throw new ExpressError('No such thing', 404)}
  res.json(found);
     
})


router.patch('/:name',checkItems, (req,res,next)=>{
    const foundIndex = items.findIndex(something => something.name === req.params.name );
    console.log(foundIndex);
    if(foundIndex === -1){ throw new ExpressError('No such Thing', 404)}
    items.splice(foundIndex,1);
    const newItem = {name: req.body.name, price: req.body.price};
    items.push(newItem)
    res.json({Updated: newItem})
})


//delete route

router.delete('/:name',(req,res,next)=>{
    const foundIndex = items.findIndex(something => something.name === req.params.name );
    if(foundIndex == -1){throw new ExpressError('no item', 404)}
    items.splice(foundIndex,1);
    res.json({message:'Deleted'})


})




module.exports = router