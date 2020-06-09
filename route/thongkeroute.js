let express=require('express');
let router=express.Router();
let thongkeController=require('../controller/thongkeController');
router.get('/dsnv',thongkeController.dsnv);
router.get('/luongtheothang',thongkeController.dsluongtheothang);
router.get('/luongtheophongban',thongkeController.dsluongtheophongban);
router.get('/luongnhanvien/:id',thongkeController.dsluongtungnhanvien);


module.exports=router;