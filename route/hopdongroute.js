let express = require('express');
let router=express.Router();
let hopdongcontroller=require('../controller/hopdongcontroller');
router.get('/',hopdongcontroller.getList);
router.post('/themhopdong',hopdongcontroller.addhopdong);
router.patch('/:id',hopdongcontroller.updatehopdong);
router.delete('/:id',hopdongcontroller.deletehopdong);
module.exports=router;