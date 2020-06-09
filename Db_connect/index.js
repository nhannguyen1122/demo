var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'test1'
});
db.connect((err)=>{
  if(err){
      console.log(err);
  }
  console.log('connected to db...')

});
module.exports=db;