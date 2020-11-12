let db=require('../Db_connect');





let mapidtonumber=array=>{
    return Math.max(...array.map(item=>parseInt(item.id.split('').slice(11).join(''))))
}
module.exports ={
    getList:(req,res) =>{
        db.query(`SELECT nhanvien.id,ten_nhanvien,trangthai,ten_phongban,ten_chucvu,tenhopdong,soCMND,email,ngaysinh,diachi,hocvan,nhanvien.thoigiancapnhat FROM test1.nhanvien,test1.phongban,test1.chucvu,test1.hopdong where nhanvien.id_chucvu=chucvu.id and nhanvien.id_phongban=phongban.id and nhanvien.id_hopdong=hopdong.id`,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
           return  res.status(200).json(result);
        });
    },
    getdetail:(req,res) =>{
        const {id}=req.params;
        db.query(`SELECT nhanvien.id,ten_nhanvien,trangthai,ten_phongban,ten_chucvu,tenhopdong,soCMND,email,ngaysinh,diachi,hocvan,test1.nhanvien.thoigiancapnhat FROM test1.nhanvien,test1.phongban,test1.chucvu,test1.hopdong where nhanvien.id='${id}'and nhanvien.id_chucvu=chucvu.id and nhanvien.id_phongban=phongban.id and nhanvien.id_hopdong=hopdong.id`,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
          if(result.length<=0){
             return  res.status(500).json({msg:'ko tim thay id'});
          }
          else{
             return  res.status(200).json(result);
          }
           
        })
    },
    addNew:(req,res) =>{
       
       // select id=>>> insert into
       const{ten_nhanvien,ten_phongban,ten_chucvu,tenhopdong,soCMND,trangthai,email,ngaysinh,diachi,hocvan}=req.body;
       //autogenerateid
       let object=null;
       let id_luongcb=null;
       let id_phucap=null;
       let autogenerateid='id_nhanvien';
        db.query(`SELECT id FROM nhanvien  
                 `,(err,result)=>{
                     
                    if(err){
                       return  res.status(500).send(err)
                    }
                    else{
                        
                        if(result.length>0){
                        // let number=result[0].id.split('').slice(11).join('');
                        // //10
                        // let lastindex=parseInt(number)+1;
                       let number=mapidtonumber(result);
                            
                            autogenerateid=autogenerateid.concat(number+1);
                            
                        }
                        else{
                            autogenerateid='id_nhanvien0';
                        }
                        
                        db.query(`select phongban.id as phongbanid ,chucvu.id as chucvuid,hopdong.id as hopdongid from hopdong, phongban,chucvu where ten_phongban='${ten_phongban}'
                        and ten_chucvu='${ten_chucvu}'and tenhopdong='${tenhopdong}'`,(err,result)=>{
                            if(err){
                               return  res.status(500).json(err);
                            }
                            else{
                               object=result[0];
                               if(result.length>0){
                                  db.query(`select id from nhanvien where ten_nhanvien='${ten_nhanvien}' and
                                  id_phongban='${object.phongbanid}' and id_chucvu='${object.chucvuid}' and id_hopdong='${object.hopdongid}' and
                                    trangthai='${trangthai}' and soCMND='${soCMND}' and email='${email}' and ngaysinh='${ngaysinh}'
                                     and diachi='${diachi}' and hocvan='${hocvan}'
                                  `,(err,result)=>{
                                      
                                      if(err){
                                        return  res.status(500).json(err);
                                      }
                                      if(result.length>0){
                                         return  res.status(500).json({msg:'da ton tai trong csdl'});
                                      }
                                      else{
                                                 
                                        db.query(`insert into nhanvien (id,ten_nhanvien,id_phongban,id_chucvu,id_hopdong,soCMND,trangthai,
                                            email,ngaysinh,diachi,hocvan,thoigiancapnhat)
                                            values ('${autogenerateid}','${ten_nhanvien}','${object.phongbanid}','${object.chucvuid}','${object.hopdongid}', 
                                            '${soCMND}', '${trangthai}','${email}', '${ngaysinh}', '${diachi}', '${hocvan}','${new Date().toString()}')`,(err,result)=>{
                                                if(err){
                                                    console.log(err);
                                                }
                                            
                                                if(result.affectedRows===1){
                                                
                                                    db.query(`insert into tieusu(id_nhanvien,ten_nhanvien,ten_phongban,ten_chucvu,tenhopdong,thoigian) values('${autogenerateid}','${ten_nhanvien}','${ten_phongban}',
                                                    '${ten_chucvu}','${tenhopdong}','${new Date().toString()}')`,(err,result)=>{
                                                        
                                                        if(err){
                                                           return  res.status(500).json(err);
                                                        }
                                                        
                                                            if(result.affectedRows===1){
                                                               
                                                                db.query(`insert into thuongphat(id_nhanvien,ten_khenthuong,tienthuong,ten_loiphat,tienphat,thang)values('${autogenerateid}','',0,'',0,'${new Date().getMonth()+1}')`,(err,result)=>{

                                                                   
                                                                    if(err){
                                                                       return  res.status(500).json(err);
                                                                    }
                                                                    
                                                                        if(result.affectedRows===1){
                                                                           return  res.status(201).send('add success');
                                                                          
            
                                                                        
                                                                    }
                                                                })

                                                            
                                                        }
                                                    });
                                                }
                                            })

                                      }
                                  })
                               }
                               else{
                                  return  res.json({msg:'ko tim thay id'})
                               }
                            }
                        })



                        // db.query(`select id from nhanvien 
                        // where id_phongban='${id_phongban}' and id_chucvu='${id_chucvu}' and id_hopdong='${id_hopdong}'`,(err,result)=>{
                        //     if(err){
                        //       return  res.status(500).json(err);
                        //     }
                            
                        //    else{
                        //        console.log(autogenerateid);
                        //      if(result.length<=0){
                        //          console.log(id_hopdong);
                        //         db.query(`insert into nhanvien (id,ten_nhanvien,id_phongban,id_chucvu,id_hopdong,soCMND,trangthai,email,ngaysinh,diachi,hocvan)
                        //         values ('${autogenerateid}','${ten_nhanvien}','${id_phongban}','${id_chucvu}','${id_hopdong}', '${soCMND}', '${trangthai}','${email}', '${ngaysinh}', '${diachi}', '${hocvan}')`,(err,result)=>{
                        //             if(err){
                        //               return  res.status(500).json(err);
                        //             }
                                   
                        //                else{
                        //                return  res.status(201).json({msg:'add success'});
                        //                }
                                    
                        //            })
                        //      }
                        //    }
                         
                            
                        // })
                    }
                })


       
      
    //    
      

    }, 
    updateemployee:(req,res) =>{
        //select id==>> update
        // let tieusuid=null;
        let object=null;
        let id_luongcb=null;
        let id_phucap=null;
        const{id}=req.params;
        console.log(id);
        const{ten_nhanvien,ten_phongban,ten_chucvu,tenhopdong,soCMND,trangthai,email,ngaysinh,diachi,hocvan}=req.body;
        console.log(tenhopdong,ten_phongban,ten_chucvu);
        db.query(`select phongban.id as phongbanid ,chucvu.id as chucvuid,hopdong.id as hopdongid from hopdong, phongban,chucvu where ten_phongban='${ten_phongban}'
                        and ten_chucvu='${ten_chucvu}'and tenhopdong='${tenhopdong}'`,(err,result)=>{
                            if(err){
                              return  res.status(500).json(err);
                            }
                            else{
                                
                               object=result[0];
                               console.log(trangthai);
                               if(result.length>0){
                                db.query(`SELECT id as tieusuid FROM tieusu  
                                where id_nhanvien='${id}'
                                    ORDER BY id DESC  
                                    LIMIT 1;`,(err,result)=>{
                                        if(err){
                                           return  res.status(500).json(err);
                                        }
                                        else{
                                          const{tieusuid}=result[0];
                                          db.query(`update nhanvien SET ten_nhanvien='${ten_nhanvien}',id_phongban='${object.phongbanid}',id_chucvu='${object.chucvuid}',id_hopdong='${object.hopdongid}',
                                          soCMND='${soCMND}',trangthai='${trangthai}',email='${email}',ngaysinh='${ngaysinh}',diachi='${diachi}',hocvan='${hocvan}' where id='${id}'  `,(err,result)=>{
                                              if(err){
                                                return  res.status(500).json(err);
                                              }
                                              else{
                                                if(result.affectedRows===1){
                                                  db.query(`update tieusu set ten_nhanvien='${ten_nhanvien}',ten_phongban='${ten_phongban}',ten_chucvu='${ten_chucvu}',tenhopdong='${tenhopdong}'
                                                             where id='${tieusuid}'
                                                             `,(err,result)=>{
                                                                 if(err){
                                                                    return  res.status(500).json(err);
                                                                 }
                                                                 else{
                                                                    db.query(`update user set ten_nhanvien='${ten_nhanvien}'where id_nhanvien='${id}'`,(err,result)=>{
                                                                        if(err){
                                                                           return  res.status(500).json(err);
                                                                        }
                                                                        else{
                                                                           return  res.status(200).json({msg:'update success'});
                                                                        }
                                                                    })
                                                                 }
                                                             })
                                                }
                                                
        
                                              }
                                          })
                                        }
                                    })
                               }
                               else{
                                  return  res.status(500).json({msg:'ko tim thay id'})
                               }
                            }
                        })

    },
    deleteemployee:(req,res) =>{
        const{id}=req.params;
        db.query(`select * from nhanvien where id='${id}'`,(err,result)=>{
            if(err){
              return  res.status(500).json(err);
            }
            if(result.length<=0){
                res.sta('ko tim thay id');
            }
            else{
                db.query(`DELETE FROM nhanvien WHERE id='${id}'`,(err,result)=>{
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
    },
    thuyenchuyenemployee:(req,res)=>{
        
        let object=null;
        const{id}=req.params;
        console.log(id);
        const{ten_phongban,ten_chucvu,tenhopdong}=req.body;
       
        db.query(`select phongban.id as phongbanid ,chucvu.id as chucvuid,hopdong.id as hopdongid from hopdong, phongban,chucvu where ten_phongban='${ten_phongban}'
                        and ten_chucvu='${ten_chucvu}'and tenhopdong='${tenhopdong}'`,(err,result)=>{
                            if(err){
                              return  res.status(500).json(err);
                            }
                            else{
                                
                               object=result[0];
                               
                               if(result.length>0){
                                  db.query(`select id from nhanvien where id_phongban='${object.phongbanid}'and
                                id_chucvu='${object.chucvuid}' and id_hopdong='${object.hopdongid}'
                                  `,(err,result)=>{
                                      if(err){
                                         return  res.status(500).json(err);
                                      }
                                      if(result.length>0){
                                         return  res.status(500).json({msg:'du lieu chua duoc thay doi'});
                                      }
                                      else{
                                                db.query(`update nhanvien SET id_phongban='${object.phongbanid}',id_chucvu='${object.chucvuid}',id_hopdong='${object.hopdongid}' where id='${id}' `,(err,result)=>{
                                                    if(err){
                                                   return  res.status(500).json(err);
                                                    }
                                                    else{
                                                    if(result.affectedRows===1){
                                                    db.query(`select ten_nhanvien from nhanvien where id='${id}'`,(err,result)=>{
                                                        if(err){
                                                           return  res.status(500).json(err);
                                                        }
                                                        else{
                                                            db.query(`insert into tieusu (id_nhanvien,ten_nhanvien,ten_phongban,ten_chucvu,tenhopdong,thoigian) values('${id}','${result[0].ten_nhanvien}','${ten_phongban}',
                                                            '${ten_chucvu}','${tenhopdong}','${new Date().toString()}')`,(err,result)=>{
                                                                if(err){
                                                                   return  res.status(500).json(err);
                                                                }
                                                                if(result.affectedRows===1){
                                                                   return  res.status(200).json({msg:'success'});
                                                                }
                                                            });
                                                        }
                                                    })
                                                    }

                                                    


                                                    }
                                                })
                                      }
                                  })
                               }
                               else{
                                  return  res.json({msg:'ko tim thay id'})
                               }
                            }
                        })


    },
    //thuyen chuyen
    getthuyenchuyen:(req,res)=>{
        
        const{id}=req.params
        db.query(`select * from tieusu where id_nhanvien='${id}'`,(err,result)=>{
            if(err){
              return  res.status(500).json(err);
            }
            else{
               return  res.json(result);
            }
        })
    }
}