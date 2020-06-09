let express=require('express');
let router=express.Router();
let luongcontroller=require('../controller/luongcontroller');
// luong cb
router.get('/luongnv',luongcontroller.getListluongnv);
// router.post('/luongnv/luuluongnv',luongcontroller.saveListluongnv);
router.get('/luongcb',luongcontroller.getListluongcb);
 router.post('/addluongcb',luongcontroller.addluongcb);
 router.patch('/luongcb/:id',luongcontroller.updateluongcb);
router.delete('/luongcb/:id',luongcontroller.deleteluongcb);

//luong thuong phat
router.get('/luongthuongphat',luongcontroller.getListthuongphat);
//  router.post('/addluongthuongphat',luongcontroller.addluongthuongphat);
 router.patch('/luongthuongphat/:id',luongcontroller.updatethuongphat);
// router.delete('/luongphatsinh/:id',luongcontroller.deleteluongphatsinh);

//phucap
router.get('/phucap',luongcontroller.getphucap);
router.post('/phucap/addphucap',luongcontroller.themphucap);
router.patch('/phucap/:id',luongcontroller.suaphucap);
router.delete('/phucap/:id',luongcontroller.xoaphucap);
module.exports=router;