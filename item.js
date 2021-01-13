
const express = require('express');
const router = new express.Router();
const ExpressError = require("./expressError");
var items = require("./fakeDb")

const checkItems = (req,res,next) =>{
    if(!req.body.name) throw new ExpressError('No Name', 400);
   if(!req.body.price) throw new ExpressError('No Price', 400);
   next()

}
//get all items

router.get('/', (req,res,next)=>{
    res.json(items)
})

//post single item to items route

router.post('/',checkItems, (req,res,next)=>{
   const newItem = `{name: ${req.body.name}, price: ${req.body.price}}`;
   items.push(newItem)
   res.json(`{Added: ${newItem}}`)
})

//get name by query


router.get('/:name',(req,res,next)=>{
    
    const found = items.find(r => r.name === req.query.name);
    if(!found){
        throw new ExpressError('No such thing', 400)}
     res.send(found);
     
})



router.patch('/:name',checkItems, (req,res,next)=>{
    const foundIndex = items.findIndex(something => something.name = req.query.name );
    if(foudnIndex<0){ throw new ExpressError('No such Thing', 400)}
    items.splice(foundIndex,1);
    const newItem = `{name: ${req.body.name}, price: ${req.body.price}}`;
    items.push(newItem)
    res.json(`{Updated: ${newItem}}`)
})


//delete route

router.delete('/:name',checkItems, (req,res,next)=>{
    const foundIndex = items.findIndex(something => something.name = req.query.name );
    if(foundIndex<0){throw new ExpressError('no item', 400)}
    items.splice(foundIndex,1);
    res.json({message:'Deleted'})


})




module.exports = router