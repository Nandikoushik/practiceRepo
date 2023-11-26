const express=require("express");

const router=express.Router();
const  service=require('./service')

router.post('/service',service)


module.exports=router;