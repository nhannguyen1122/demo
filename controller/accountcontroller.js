let db=require('../Db_connect');

module.exports ={
    getList:(req,res) =>{
        db.query('select * from user where quyen!= "admin"',(err,result)=>{
            if(err){
                res.status(500).json(err)
            }
            if(result.length>0){
                res.status(200).json(result);
            }
        })
    },
    addaccount:(req,res)=>{
        // tim kiem id o csdl
        // neu khong tim thay thi them vao
        
        const {id_nhanvien,ten_nhanvien,tendangnhap,matkhau,quyen}=req.body;
        let result1='id_taikhoanquanly_';
        //auto generateid
    db.query(`SELECT id FROM user  
    ORDER BY id DESC  
    LIMIT 1;  `,(err,result)=>{
       
        if(err){
            console.log(err);
        }
        else{
            let lastid=result[0].id;
             let number=lastid.split('_')[2];
          result1=result1.concat(parseInt(number)+1) ;
        }
    })
   
       db.query(`select id from user where user.id_nhanvien='${id_nhanvien}' and user.tendangnhap='${tendangnhap}'`,(err,result)=>{
           if(err){
               res.status(500).json(err);
           }
           if(result.length>0){
               res.status(500).json({msg:' thanh vien nay da co tai khoan'});
           }
           else{
            db.query(`select * from user where  tendangnhap='${tendangnhap}'`,(err,result)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    if(result.length>0){
                        res.status(500).json({msg:'ten dang nhap da ton tai'})
                    }
                    else{
                        db.query(`insert into user (id,id_nhanvien,ten_nhanvien, tendangnhap, matkhau,quyen)values ('${result1}','${id_nhanvien}','${ten_nhanvien}','${tendangnhap}', '${matkhau}', '${quyen}')`,(err,result)=>{
                            if(err){
                                res.status(500).json(err)
                            }
                           
                            res.status(201).json({msg:'add success'});
                        })
                    }
                })
                
           }
       })








    //    

    },
    updateaccount:(req,res)=>{
        
        const{id}=req.params;
        const{tendangnhap,matkhau}=req.body;
        db.query(`select * from user where id='${id}'`,(err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            if(result.length<=0){
                res.status(500).json({msg:'ko tim thay id'})
            }
            else{
               db.query(`select id from user where tendangnhap='${tendangnhap}' and id!='${id}'`,(err,result)=>{
                   if(err){
                       res.status(500).json(err);
                   }
                   if(result.length<=0){
                    db.query(`UPDATE user SET tendangnhap = '${tendangnhap}', matkhau = '${matkhau}' WHERE id = '${id}'`,(err,result)=>{
                        if(err){
                            res.status(500).json(err)
                        }
                        if(result.affectedRows===1){
                            res.status(200).json({msg:'update thanh cong'});
                        }
                        else{
                            res.status(500).json({msg:'update that bai'});
                        }
                    });
                   }
                   else{
                       res.status(500).json({msg:'ten dang nhap da ton tai'});
                   }
               })
            }
        })
       


    },
    deleteaccount: (req,res)=>{
        const{id}=req.params;
        
        db.query(`select * from user where id='${id}'`,(err,result)=>{
            if(err){
               res.json(err);
            }
            if(result.length<=0){
                res.json({msg:'ko tim thay id'})
            }
            else{
                db.query(`DELETE FROM user WHERE id='${id}'`,(err,result)=>{
                    if(err){
                        res.json(err);
                    }
                    if(result.affectedRows===1){
                        res.status(204).json({msg:'delete thanh cong'});
                    }
                    else{
                        res.status(500).json({msg:'delete that bai'});
                    }
                })
            }
    })}
}
