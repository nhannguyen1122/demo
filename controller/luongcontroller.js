let db=require('../Db_connect');
let mapidtonumber=(array,index)=>{
    return Math.max(...array.map(item=>parseInt(item.id.split('').slice(index).join(''))))
}
let transform=(array)=>{
    
    return array.map(item=>[0,item.id,item.ten_nhanvien,item.songaycong,item.thangtinhcong,item.ten_chucvu,item.ten_phongban,item.luongcapbac,item.tien_phucap,item.ten_khenthuong,item.tienthuong,item.ten_loiphat,item.tienphat,item.tongluong]);
}
let array=[];
module.exports ={

    //luong cap bac
    getListluongcb:(req,res)=>{
        db.query(`select luongcb.id , phongban.ten_phongban, chucvu.ten_chucvu,luongcapbac from luongcb,phongban,
        chucvu where luongcb.id_phongban=phongban.id and luongcb.id_chucvu=chucvu.id`,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
            else{
               
               return  res.json(result);
            }
        })
    },
    // saveListluongnv:(req,res)=>{
    // //     let state=false
        
    // //     for(var i =0;i<array.length;i++){
    // //         console.log('la',array[i].id)
    // //         db.query(`select id from luongnhanvien where luongnhanvien.id_nhanvien='${array[i].id}'and 
    // //         luongnhanvien.ten_nhanvien='${array[i].ten_nhanvien}'and  luongnhanvien.songaycong='${array[i].songaycong}'
    // //        and  luongnhanvien.thangtinhcong='${array[i].thangtinhcong}'and  luongnhanvien.ten_chucvu='${array[i].ten_chucvu}'and 
    // //         luongnhanvien.ten_phongban='${array[i].ten_phongban}'and  luongnhanvien.luongcapbac='${array[i].luongcapbac}'and
    // //           luongnhanvien.tien_phucap='${array[i].tien_phucap}'and  luongnhanvien.ten_khenthuong=
    // //        '${array[i].ten_khenthuong}'and  luongnhanvien.tienthuong='${array[i].tienthuong}'and 
    // //         luongnhanvien.ten_loiphat='${array[i].ten_loiphat}'and  luongnhanvien.tienphat='${array[i].tienphat}'
    // //         and  luongnhanvien.tongluong='${array[i].tongluong}'`,(err,result)=>{
    // //             if(err){
    // //                 console.log(err);
    // //             }
    // //            if(result.length<=0){
    // //                state=true;
    // //            }
    // //         })
    // //     }
    // // //    for(var i=0;i<array.length;i++){
    // // //        db.query(`INSERT INTO luongnhanvien (id,id_nhanvien,ten_nhanvien,songaycong,thangtinhcong,
    // // //         ten_chucvu,ten_phongban,luongcapbac,tien_phucap,
    // // //         ten_khenthuong,tienthuong,ten_loiphat,tienphat,tongluong) VALUES (0,'${array[i].id}','${array[i].ten_nhanvien}','${array[i].songaycong}',
    // // //         '${array[i].thangtinhcong}','${array[i].ten_chucvu}','${array[i].ten_phongban}','${array[i].luongcapbac}',
    // // //         '${array[i].tien_phucap}','${array[i].ten_khenthuong}','${array[i].tienthuong}','${array[i].ten_loiphat}','${array[i].tienphat}','${array[i].tongluong}')`,(err,result)=>{
    // // //             if(err){
    // // //                return  res.status(500).json(err);
    // // //             }
    // // //             if(result.affectedRows===1){
    // // //               state=true;
                   

    // // //             }
    // // //         });
    // // //         break;
    // // //    }
    
    // // let sql=`INSERT INTO luongnhanvien (id,id_nhanvien,ten_nhanvien,songaycong,thangtinhcong,
    // //     ten_chucvu,ten_phongban,luongcapbac,tien_phucap,
    // //     ten_khenthuong,tienthuong,ten_loiphat,tienphat,tongluong)values ?`; 
    // // let value=transform(array);
    // //     console.log(value);
    // // if(state){
    // //     if(value.length>0){
    // //         db.query(sql,[value],(err,result)=>{
    // //             if(err){
    // //                return  res.status(500).json(err);
    // //             }
    // //            if(result.affectedRows>0){
    // //                 array=[];
    // //               return  res.status(200).json({msg:'luu thanh cong'});
    // //            }
    // //         });
    // //     }
    // //   else{
    // //      return  res.status(500).json({msg:'da luu'});
    // //   }
    // // }
    // // else{
    // //    return  res.status(200).json({msg:'du lieu   '});
    // // }
    // }
    // ,
    getListluongnv:(req,res)=>{
        let array=[];

        db.query(`select count(*) as dembangcong from bangcong`,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
           if(result[0].dembangcong){
            db.query(`select id from luongnhanvien where luongnhanvien.thangtinhcong=${new Date().getMonth()+1}`,(err,result)=>{
                console.log(result.length)
                if(err){
                   return  res.status(500).json(err);
                }
                if(result.length<=0){
                        
                                db.query( `SELECT 
                                nhanvien.id,
                                nhanvien.ten_nhanvien,
                                bangcong.songaycong AS songaycong,
                                bangcong.thangtinhcong,
                                chucvu.ten_chucvu,
                                phongban.ten_phongban,
                                luongcb.luongcapbac AS luongcapbac,
                                phucap.tien_phucap AS tien_phucap,
                                thuongphat.ten_khenthuong,
                                thuongphat.tienthuong AS tienthuong,
                                thuongphat.ten_loiphat,
                                thuongphat.tienphat AS tienphat,
                                (songaycong * luongcapbac + tien_phucap - tienphat + tienthuong) AS tongluong
                            FROM
                                test1.nhanvien
                                    LEFT JOIN
                                test1.bangcong ON nhanvien.id = bangcong.id_nhanvien
                                    LEFT JOIN
                                test1.luongcb ON nhanvien.id_chucvu = luongcb.id_chucvu
                                    AND nhanvien.id_phongban = luongcb.id_phongban
                                    LEFT JOIN
                                test1.phucap ON nhanvien.id_chucvu = phucap.id_chucvu
                                    LEFT JOIN
                                test1.thuongphat ON nhanvien.id = thuongphat.id_nhanvien
                                left join test1.phongban
                                on nhanvien.id_phongban=phongban.id
                                left join test1.chucvu
                                on nhanvien.id_chucvu=chucvu.id
                                where bangcong.thangtinhcong=${new Date().getMonth()+1}
                            
                            
                            
                            `,(err,result)=>{
                                    if(err){
                                       return  res.status(500).json(err);
                                    }
                                    else{
                                       
                                       
                                        let sql=`INSERT INTO luongnhanvien (id,id_nhanvien,ten_nhanvien,songaycong,thangtinhcong,
                                            ten_chucvu,ten_phongban,luongcapbac,tien_phucap,
                                            ten_khenthuong,tienthuong,ten_loiphat,tienphat,tongluong)values ?`; 
                                        let value=transform(result);
                                        array=result;
                                                db.query(sql,[value],(err,result)=>{
                                                        if(err){
                                                               return  res.status(500).json(err);
                                                            }
                                                        if(result.affectedRows>0){
                                                           db.query(`update test1.thuongphat set ten_khenthuong='', tienthuong=0 , ten_loiphat='', tienphat=0 , thang='${new Date().getMonth()+2}' `,(err,result)=>{
                                                               if(err){
                                                                  return  res.status(500).json(err);
                                                               }
                                                              if(result.affectedRows>0){
                                                                 return  res.status(200).json(array);
                                                              }
                                                           })
                                                                
                                                            
                                                        }
                                                });                           
                                    }
                                })
                }
                else{
                        db.query( `select * from luongnhanvien where thangtinhcong=${new Date().getMonth()+1}`,(err,result)=>{
                            if(err){
                               return  res.status(500).json(err);
                            }
                            else{
                               return  res.json(result);
                            }
                        });
    
    
                            }
            })  
           }
           else{
              return  res.status(500).json({msg:'bang cong chua co du lieu'});
           }
        })
    },
    addluongcb:(req,res)=>{
        const{ten_phongban,ten_chucvu,luongcapbac}=req.body;
       // kiem tra xem o bang phong ban va bang chuc vu co id do k neu k co thi
     // CHECK ID TON TAI O BANG LUONGCB HAY K
     let generateid='id_';
     let object=null;
     db.query(`select phongban.id as id1,chucvu.id as id2 from phongban,chucvu where phongban.ten_phongban='${ten_phongban}' 
     and chucvu.ten_chucvu='${ten_chucvu}' `,(err,result)=>{
       
         if(err){
             console.log(err);
         }
        
         if(result.length>0){
             //result:[
            //      {
            //          id1:id_abc,
            //          id2:id_def,
            //      }
            //  ]
            object=result[0];
           generateid= generateid.concat(`${result[0].id1.split('_')[1]}_${result[0].id2.split('_')[1]}`);
           db.query(`select id from luongcb where id_chucvu='${result[0].id2}' and id_phongban='${result[0].id1}'`,(err,result)=>{
            console.log('result la',result);
            if(err){
               return  res.status(500).json(err);
            }
           if(result.length<=0){
               db.query(`insert into luongcb(id,id_phongban,id_chucvu,luongcapbac,thoigiancapnhat) values('${generateid}','${object.id1}','${object.id2}','${luongcapbac}','${new Date().toString()}')`,(err,result)=>{
                   if(err){
                      return  res.status(500).json(err);
                   }
                   if(result.affectedRows===1){
                      return  res.status(201).json({msg:'add success'});
                   }
               })
           }
           else{
              return  res.json({msg:'luong cap bac nay da ton tai'});
           }
        })
         }
     })
    
    },

    
    updateluongcb:(req,res)=>{
        // check id params
        let object=null;
        let luongcb=null;
        const{id}=req.params;
        const{ten_phongban,ten_chucvu,luongcapbac}=req.body;
        db.query(`select id,luongcapbac from luongcb where id='${id}'`,(err,result)=>{
           
            luongcb=result[0].luongcapbac;
            if(err){
               return  res.status(500).json(err);
            }
           if(result.length>0){
               
                    db.query(`select phongban.id as id1,chucvu.id as id2 from phongban,chucvu where phongban.ten_phongban='${ten_phongban}' 
                    and chucvu.ten_chucvu='${ten_chucvu}' `,(err,result)=>{
                        if(err){
                           return  res.status(500).json(err);
                        }
                       
                        object=result[0];
                        if(result.length>0){
                            db.query(`select id from luongcb where id_phongban='${result[0].id1}'and id_chucvu='${result[0].id2}' and luongcapbac='${luongcapbac}'`,(err,result)=>{
                                if(err){
                                   return  res.status(500).json(err);
                                }
                                console.log('result1',result);
                                if(result.length<=0){
                                   db.query(`select id from luongcb where id_phongban='${object.id1}' and id_chucvu='${object.id2}'`,(err,result)=>{
                                       if(err){
                                          return  res.status(500).json(err);

                                       }
                                       if(result.length<=0){
                                        db.query( ` update luongcb SET   id_phongban='${object.id1}',id_chucvu='${object.id2}',luongcapbac='${luongcapbac}',thoigiancapnhat='${new Date().toString()}' where id='${id}'`,(err,result)=>{
                                            if(err){
                                               return  res.status(500).json(err);
                                            }
                                            else{
                                               if(result.affectedRows===1){
                
                                                //update primary key?????????
                                                //    db.query(`update luongcb set id='${generateid}'`,(err,result)=>{
                                                //        if(err){
                                                //           return  res.status(500).json(err);
                                                //        }
                                                //        else{
                                                //            res.send(result);
                                                //        }
                                                //    })
                                               return  res.status(200).json({msg:'update  success'});
                                               }
                                            }
                                        })
                                       }
                                       else{
                                        db.query( ` update luongcb SET  luongcapbac='${luongcapbac}',thoigiancapnhat='${new Date().toString()}' where id='${id}'`,(err,result)=>{
                                            if(err){
                                               return  res.status(500).json(err);
                                            }
                                            else{
                                               if(result.affectedRows===1){
                
                                                //update primary key?????????
                                                //    db.query(`update luongcb set id='${generateid}'`,(err,result)=>{
                                                //        if(err){
                                                //           return  res.status(500).json(err);
                                                //        }
                                                //        else{
                                                //            res.send(result);
                                                //        }
                                                //    })
                                               return  res.status(200).json({msg:'update luongcapbac success'});
                                               }
                                            }
                                        })
                                       }
                                   })
                                    

                                }
                                else{
                                  return  res.status(500).json({msg:'du lieu cap nhat chua thay doi'})
                                }


                        }
                        );




                         
                    }
                   
               })
           }
           else{
              return  res.status(500).json({msg:'ko ton tai'});
           }
        })
    },
    deleteluongcb:(req,res)=>{
        const{id}=req.params;
        db.query(`select * from luongcb where id='${id}'`,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
            if(result.length<=0){
               return  res.status(500).json({msg:'ko tim thay id'});
            }
            else{
                
                db.query(`DELETE FROM luongcb WHERE id='${id}'`,(err,result)=>{
                    if(err){
                       return  res.json(err);
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


    //quan ly luong phat sinh
    getListthuongphat:(req,res)=>{
        db.query(`select thuongphat.id,thuongphat.id_nhanvien,nhanvien.ten_nhanvien,thuongphat.ten_khenthuong,
        thuongphat.tienthuong,thuongphat.ten_loiphat,thuongphat.tienphat
         from test1.thuongphat,test1.nhanvien where nhanvien.id=thuongphat.id_nhanvien `,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
            else{
               return  res.status(200).json(result);
            }
        })
    },


    
    // addluongphatsinh:(req,res)=>{ 
    //     let autoid='id_phatsinh';
    //     const{id_nhanvien,tienthuong,ten_phucap,tienphucap,ten_loiphat,tienphat} = req.body;
       
    //     db.query(`SELECT id FROM phatsinh  
    //             `,(err,result)=>{
    //                 if(err){
    //                     console.log(err)
    //                 }
    //                 if(result.length>0){
                        
    //                     // let number=parseInt(result[0].id.split('')[11]);
    //                     let number=mapidtonumber(result)
    //                     autoid=autoid.concat(number+1)
                       
    //                     db.query(`insert into phatsinh(id,id_nhanvien,tienthuong,ten_phucap,tienphucap,ten_loiphat,tienphat) values('${autoid}','${id_nhanvien}','${tienthuong}','${ten_phucap}','${tienphucap}','${ten_loiphat}','${tienphat}')`,(err,result)=>{
    //                         if(err){
    //                            return  res.json(err);
    //                         }
    //                         else{
    //                            return  res.status(201).json({msg:'add success'}) ;
    //                            }
    //                     })

    //                 }
    //             });
                


        
    // },
    updatethuongphat:(req,res)=>{
        const{id}=req.params;
        const{id_nhanvien,ten_khenthuong,tienthuong,ten_loiphat,tienphat,thang} = req.body;
        db.query(`select id from thuongphat where thuongphat.id_nhanvien='${id}'`,(err,result)=>{
            
            if(err){
               return  res.status(500).json(err);
            }
           if(result.length>0){
               db.query( ` update thuongphat SET ten_khenthuong='${ten_khenthuong}', tienthuong='${tienthuong}',ten_loiphat='${ten_loiphat}',tienphat='${tienphat}' where id='${result[0].id}'`,(err,result)=>{
                   
                console.log('id thuongphat la',result); 
                if(err){
                      return  res.status(500).json(err);
                   }
                   else{
                      return  res.status(200).json({msg:'update thanh cong'});
                   }
               })
           }
           else{
              return  res.status(500).json({msg:'ko ton tai'});
           }
        })
    },
    // deleteluongphatsinh:(req,res)=>{
    //     const{id}=req.params;
    //     db.query(`select * from phatsinh where id='${id}'`,(err,result)=>{
    //         if(err){
    //            return  res.status(500).json(err);
    //         }
    //         if(result.length<=0){
    //             res.send('ko tim thay id');
    //         }
    //         else{
    //             db.query(`DELETE FROM luongcb WHERE id='${id}'`,(err,result)=>{
                    
    //                 if(err){
    //                    return  res.json(err);
    //                 }
    //                 if(result.affectedRows===1){
    //                    return  res.status(204).json({msg:'delete thanh cong'});
    //                 }
    //                 else{
    //                    return  res.json({msg:'delete that bai'});
    //                 }
    //             })
    //         }
    //     })

    // },


    //quan ly phu cap
    getphucap:(req, res)=>{
        db.query(`select phucap.id,chucvu.ten_chucvu,phucap.tien_phucap,thoigiancapnhat from phucap,chucvu where phucap.id_chucvu=chucvu.id `,(err,result)=>{
            if(err){
               return  res.status(500).json(err);
            }
           return  res.status(200).json(result);
        })
    },
    themphucap:(req,res)=>{
        let autogenerateid='id_phucap';
        let idchucvu=null;
        const{ten_chucvu,tien_phucap}=req.body;
        db.query(`select id from phucap `,(err,result)=>{
            console.log(result);
            if(err){
               return  res.status(500).json(err);
            }
            else{
                if(result.length>0){
               
                    let number=mapidtonumber(result,9);
                        
                    autogenerateid=autogenerateid.concat(number+1);
    
                    
                }
                else{
                    autogenerateid='id_phucap0';
                }
                db.query(`select id  from chucvu where chucvu.ten_chucvu='${ten_chucvu}'`,(err,result)=>{
                    if(err){
                       return  res.status(500).json(err);
                    }
                   if(result.length>0){
                       idchucvu=result[0].id;
                     db.query(`SELECT id from phucap where phucap.id_chucvu='${idchucvu}'`,(err,result)=>{
                         if(err){
                            return  res.status(500).json(err);
                         }
                         if(result.length<=0){
                            db.query(`insert into phucap(id,id_chucvu,tien_phucap,thoigiancapnhat) values('${autogenerateid}','${idchucvu}','${tien_phucap}','${new Date().toString()}')`,(err,result)=>{
                                if(err){
                                   return  res.status(500).json(err);
                                }
                               if(result.affectedRows===1){
                                  return  res.status(201).json({msg:'add success'});
                               }
                            })
                         }
                         else{
                            return  res.status(500).json({msg:'luong cap bac nay da ton tai'})
                         }
                     })
                   }
                   else{
                      return  res.status(500).json({msg:'chuc vu ko ton tai!'})
                   }
                })
            }
            
        })


       
    },

    suaphucap:(req,res)=>{
        const{id}=req.params;
        let idchucvu=null;
        const{ten_chucvu,tien_phucap}=req.body;
                  db.query(`update phucap set tien_phucap='${tien_phucap}'
                  ,thoigiancapnhat='${new Date().toString()}' where id='${id}'`,(err,result)=>{
                      if(err){
                         return  res.status(500).json(err);
                      }
                      if(result.affectedRows===1){
                         return  res.status(200).json({msg:'update success'});
                      }
             
            })
           
    },
    xoaphucap:(req,res)=>{
        const {id}=req.params;
        db.query(`delete from phucap where id='${id}'`, (err,result)=>{
            if(err){
                                   return  res.json(err);
                                }
                                if(result.affectedRows===1){
                                   return  res.status(204).json({msg:'delete thanh cong'});
                                }
                                else{
                                   return  res.status(500).json({msg:'delete that bai'});
                                }
        })
    }

}