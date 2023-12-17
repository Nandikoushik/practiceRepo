const express=require("express");

const router=express.Router();
const  service=require('./service')


router.get('/customer',service.customer);
router.post('/refund',service.refund);
router.post('/createProduct',service.createProduct);
router.post('/retrivedProduct',service.retrivedProduct);
router.post('/updateProduct',service.updateProduct);
router.post('/updatePrice',service.updatePrice);
router.get('/list',service.list);
router.post('/updateProductAndPrice',service.updateProductAndPrice);


module.exports=router;