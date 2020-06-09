let express=require('express');
let router=express.Router();
let thaydoimkcontroller=require('../controller/thaydoimkcontroller');
router.patch('/:id',thaydoimkcontroller.changepass);
module.exports=router;