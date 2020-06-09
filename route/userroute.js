let express=require('express');
let router=express.Router();
let controller=require('../controller');
router.post('/login',controller.athenticationaccount);
router.get('/',controller.account);
module.exports=router;