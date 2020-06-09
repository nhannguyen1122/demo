let express=require('express');
let accountcontroller=require('../controller/accountcontroller');
let router=express.Router();
router.get('/',accountcontroller.getList);
router.post("/themtaikhoan",accountcontroller.addaccount);
router.patch("/:id",accountcontroller.updateaccount);
router.delete("/:id",accountcontroller.deleteaccount);
module.exports=router;