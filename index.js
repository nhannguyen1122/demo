let express = require('express');
let app=express();
let connect=require('./Db_connect/index');
let route=require('./route/userroute');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
let accountroute=require('./route/accountmanagementroute');
let employeeroute=require('./route/employeeroute');
let phongbanroute=require('./route/phongbanroute');
let hopdongroute=require('./route/hopdongroute');
let luongroute=require('./route/luongroute');
let thaydoimkroute=require('./route/thaydoimatkhauroute');
let thongkeroute=require('./route/thongkeroute');
let validate=require('./validate');
let adminrolevalidate=require('./validate/adminrolevalidate');
app.use("/auth",route);
// quan ly tai khoan
app.use('/quanlytaikhoan',adminrolevalidate,accountroute);
// quan ly nhan vien
app.use('/quanlynhanvien',validate,employeeroute);   
//quan ly phongban
app.use('/quanlyphongban',validate,phongbanroute);
//quan ly hop dong
app.use('/quanlyhopdong',validate,hopdongroute);
//quan ly luong
app.use('/quanlyluong',validate,luongroute);
//thay doi mat khau
app.use('/thaydoimatkhau',validate,thaydoimkroute);

//thong ke
app.use('/thongke',validate,thongkeroute);
app.listen(3000,()=>console.log('listen on 3000'))