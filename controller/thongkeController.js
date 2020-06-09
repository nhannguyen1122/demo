let db=require('../Db_connect');
module.exports={
    dsnv:(req,res)=>{
        db.query(`SELECT nhanvien.id,ten_nhanvien,trangthai,ten_phongban,ten_chucvu,tenhopdong,soCMND,email,ngaysinh,diachi,hocvan FROM test1.nhanvien,test1.phongban,test1.chucvu,test1.hopdong where nhanvien.id_chucvu=chucvu.id and nhanvien.id_phongban=phongban.id and nhanvien.id_hopdong=hopdong.id`,(err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    },
    dsluongtungnhanvien:(req,res)=>{
        const{id}=req.params;
        db.query( `select * from luongnhanvien 
        where luongnhanvien.id_nhanvien='${id}'
        ORDER BY luongnhanvien.thangtinhcong 
       
    
    
    `,(err,result)=>{
             if(err){
                 res.status(500).json(err);
             }
             else{
                  res.status(200).json(result);
             }
         })
    }
    ,
    dsluongtheothang:(req,res)=>{
        db.query( `select * from luongnhanvien 
        ORDER BY luongnhanvien.thangtinhcong
    
    
    `,(err,result)=>{
             if(err){
                 res.status(500).json(err);
             }
             else{
                  res.status(200).json(result);
             }
         })
    },
    dsluongtheophongban:(req,res)=>{
        db.query( `select * from luongnhanvien 
        order by  luongnhanvien.ten_phongban
    
    `,(err,result)=>{
             if(err){
                 res.status(500).json(err);
             }
             else{
                  res.status(200).json(result);
             }
         })
    }

}