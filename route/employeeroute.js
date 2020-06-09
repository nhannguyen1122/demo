let express=require('express');
let router=express.Router();
let employeecontroller=require('../controller/employeecontroller');
router.get('/',employeecontroller.getList);
router.get('/chitiet/:id',employeecontroller.getdetail);
router.post('/themnhanvien',employeecontroller.addNew);
router.patch('/:id',employeecontroller.updateemployee);
router.delete('/:id',employeecontroller.deleteemployee);
router.get('/thuyenchuyen/:id',employeecontroller.getthuyenchuyen);
router.patch('/thuyenchuyen/:id',employeecontroller.thuyenchuyenemployee);

module.exports=router;