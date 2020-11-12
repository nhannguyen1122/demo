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
        db.query(`select * from hopdong`,(err,result)=>{
            if(err){
              return  res.status(500).json(err);
            }
            if(result.length<=0){
               return  res.json(null);
            }
            else{
               return  res.status(200).json(result);
            }
        })
    },
    addhopdong:(req,res)=>{
        const{tenhopdong,loaihopdong}=req.body;
        let autogenerateid='id_'.concat(change_alias(tenhopdong).split(' ').join(''));
        db.query(`insert into hopdong (id,tenhopdong,loaihopdong,thoigiancapnhat)values ('${autogenerateid}','${tenhopdong}','${loaihopdong}','${new Date().toString()}')`,(err,result)=>{
            if(err){
               return  res.status(500).json(err)
            }
           
           else{
           return  res.status(200).json({msg:'add success'});
           }
        })


    }
    ,
    updatehopdong:(req,res)=>{
        const{id}=req.params;
        const{tenhopdong,loaihopdong}=req.body;
        db.query(`select * from hopdong where id='${id}'`,(err,result)=>{
            if(err){
              return  res.status(500).json(err);
            }
            if(result.length<=0){
               return  res.json({msg:'ko tim thay id'});
            }
            else{
               db.query(`select id from hopdong where hopdong.tenhopdong='${tenhopdong}' and  id!='${id}'`,(err,result)=>{
                   if(err){
                      return  res.status(500).json(err);
                   }
                   if(result.length<=0){
                    db.query(`UPDATE hopdong SET tenhopdong='${tenhopdong}' , loaihopdong='${loaihopdong}', thoigiancapnhat='${new Date().toString()}' where id='${id}'`,(err,result)=>{
                        if(err){
                           return  res.json(err)
                        }
                        if(result.affectedRows===1){
                           return  res.status(200).json({msg:'update thanh cong'});
                        }
                        else{
                           return  res.status(500).json({msg:'update that bai'});
                        }
                    });
                   }
                   else{
                   return  res.status(500).json({msg:'ten hop dong  nay da ton tai'});
                   }
               })
            }
        })

    },
    deletehopdong:(req,res)=>{
        const{id}=req.params;
        db.query(`select * from hopdong where id='${id}'`,(err,result)=>{
            if(err){
             return  res.status(500).json(err);
            }
            if(result.length<=0){
               return  res.json({msg:'ko tim thay id'})
            }
            else{
                db.query(`DELETE FROM hopdong WHERE id='${id}'`,(err,result)=>{
                    if(err){
                      return  res.status(500).json(err);
                    }
                    if(result.affectedRows===1){
                       return  res.status(204).json({msg:'delete thanh cong'});
                    }
                    else{
                       return  res.status(500).json({msg:'delete that bai'});
                    }
                })
            }
    })
    }
}