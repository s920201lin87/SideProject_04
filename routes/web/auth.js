var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')



router.get('/reg',(req,res)=>{
  res.render('auth/reg')
})

router.post('/reg',(req,res)=>{
  console.log(req.body);
  UserModel.create({...req.body, password:md5(req.body.password)},(err,data)=>{
    if(err){
      res.status(500).send('註冊失敗')
      return;
    }
    res.render('success',{msg:'註冊成功',url:'/login'});
  })
})

//login index
router.get('/login',(req,res)=>{
  res.render('auth/login')
})

//login 
router.post('/login',(req,res)=>{
  //獲得用戶帳密
  let {username,password}= req.body;
  //查詢數據庫
  UserModel.findOne({username :username,password :md5(password)},(err,data)=>{
    if(err){
      res.status(500).send('login 失敗')
      return;
    }
    //判斷data
    if(!data){
      return res.send('帳密錯誤')
    }
    //登陸成功

    req.session.username = data.username;
    req.session._id = data._id;
    res.render('success',{msg:'登陸成功',url:'/account'})
    
  })
  //判斷data
  


})

//log out
router.post('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.render('success',{msg:'成功退出',url :'/login'})
  })
})
module.exports = router;
