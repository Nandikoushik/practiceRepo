const express=require("express");

const router=express.Router();
const {webhooks,productPRICE} =require('./controller')

router.post('/webhooks',webhooks);
router.post('/createProduct&PRICE',productPRICE)


module.exports=router;