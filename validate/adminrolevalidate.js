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
            
           if(user){
            console.log(user)
            if(user.role.includes('admin')){
                req.user=user;
                next();
            }
           else{
               res.status(500).json({msg:'chuc nang nay chi cho admin'})
           }
           }
           
        })
        }

     
}
module.exports=validate;