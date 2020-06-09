let db=require('../Db_connect');
let jwt=require('jsonwebtoken');
module.exports ={
    //authentication
    account:(req,res)=>{
        res.json({msg:'this is account infor'});
    },
    athenticationaccount:(req,res)=> {
        
        
        if(req.body){
            
            const{username,password}=req.body;
         db.query(`select * from user where tendangnhap='${username}' and matkhau='${password}'`,(error,result)=>{
             if(error){
                 res.status(500).json(error);
             }
             if(result.length>0){
                let token= jwt.sign({role:result[0].quyen,id:result[0].id},'secretkey',{expiresIn:'1h'});
                res.json(token);
             }
             else{
                 res.json({msg:'loi dang nhap'});
             }
         })
            

        }

    }
}