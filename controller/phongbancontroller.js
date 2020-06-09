let db=require('../Db_connect');
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}
module.exports ={
    getList:(req,res)=>{
        db.query(`select * from phongban`,(err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            if(result.length<=0){
                res.status(500).json(null);
            }
            else{
                res.status(200).json(result);
            }
        })
    },
    addphongban:(req,res)=>{
        const{ten_phongban}=req.body;
        let autogenerateid='id_'.concat(change_alias(ten_phongban).split(' ').join(''));
        db.query(`insert into phongban (id,ten_phongban,thoigiancapnhat)values ('${autogenerateid}','${ten_phongban}','${new Date().toString()}')`,(err,result)=>{
            if(err){
                res.status(500).json(err)
            }
           
           else{
            res.status(201).json({msg:'add success'});
           }
        })


    }
    ,
    updatephongban:(req,res)=>{
        const{id}=req.params;
        console.log(id);
        const{ten_phongban}=req.body;
        db.query(`select id from phongban where id='${id}'`,(err,result)=>{
            if(err){
                res.status(500).json(err);
            }
            if(result.length<=0){
                res.status(500).json({msg:'ko tim thay id'});
            }
            else{
               db.query(`select id from phongban where  phongban.ten_phongban='${ten_phongban}' and phongban.id!='${id}'`,(err,result)=>{
                   if(err){
                       res.status(500).json(err);
                   }
                   if(result.length<=0){
                    db.query(`UPDATE phongban SET ten_phongban='${ten_phongban}',thoigiancapnhat='${new Date().toString()}'where id='${id}'`,(err,result)=>{
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
                       res.status(500).json({msg:'phong ban da ton tai'})
                   }
               })
            }
        })

    },
    deletephongban:(req,res)=>{
        const{id}=req.params;
        db.query(`select * from phongban where id='${id}'`,(err,result)=>{
            if(err){
               res.status(500).json(err);
            }
            if(result.length<=0){
                res.status(500).json({msg:'ko tim thay id'})
            }
            else{
                db.query(`DELETE FROM phongban WHERE id='${id}'`,(err,result)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    if(result.affectedRows===1){
                        res.status(204).json({msg:'delete thanh cong'});
                    }
                    else{
                        res.status(500).json({msg:'delete that bai'});
                    }
                })
            }
    })
    }
}