let express=require('express');
let router=express.Router();
let phongbancontroller=require('../controller/phongbancontroller');
router.get('/',phongbancontroller.getList);
router.post('/',phongbancontroller.addphongban);
router.patch('/:id',phongbancontroller.updatephongban);
router.delete('/:id',phongbancontroller.deletephongban);
module.exports=router;