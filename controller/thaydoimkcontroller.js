let db=require('../Db_connect');

module.exports ={
    changepass:(req,res)=>{
        const{id}=req.params;
        const{matkhau}=req.body;
        db.query(`update user set matkhau='${matkhau}' where id='${id}'`,(err,result)=>{
            if(err){
                res.json(err);
            }
            if(result.affectedRows===1){
                res.status(200).json({msg:'update success'});
            }
        });
    }
}