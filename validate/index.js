let jwt=require('jsonwebtoken')
const validate=(req,res,next)=>{
    // let tokenheader=req.headers.authorization;
     let tokenheader=req.header('Authorization');
    if(!tokenheader){
        res.status(401).send('access denied');
    }
    else{
        let token=tokenheader.split(" ")[1];
        jwt.verify(token,'secretkey',(err,user)=>{
            if(err){
                res.status(500).send(err);
            }
            else{
                req.user=user;
            next();
            }
        })
    }
    

     
}
module.exports=validate;