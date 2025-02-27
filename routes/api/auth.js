var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken')



//login 
router.post('/login',(req,res)=>{
  //獲得用戶帳密
  let {username,password}= req.body;
  //查詢數據庫
  UserModel.findOne({username :username,password :md5(password)},(err,data)=>{
    if(err){
      res.json({
        code:'2001',
        msg:'資料庫讀取失敗',
        data:null
      })
      return;
    }
    //判斷data
    if(!data){
      return res.json({
        code:'2002',
        msg:'帳號密碼錯誤',
        data:null
      })
    }

    let token = jwt.sign({
      username:data.username,
      _id:data._id
    },'TommyLinYen',{
      expiresIn: 60 * 60 * 24 * 7
    })

    return res.json({
      code:'0000',
      msg:'登陸成功',
      data:token
    })

    //登陸成功
    
    res.render('success',{msg:'登陸成功',url:'/account'})
    
  })
  //判斷data
})

//logout
router.post('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.render('success',{msg:'成功退出',url :'/login'})
  })
})
module.exports = router;
