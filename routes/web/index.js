const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
//導入middleware
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');


router.get('/',(req,res)=>{
  res.redirect('/account')

})


router.get('/account',checkLoginMiddleware, function(req, res, next) {

  // let accounts= db.get('accounts').value();
  AccountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      res.status(500).send('讀取失敗');
      return;
    }
    
    res.render('list',{accounts:data,moment:moment});  
  })
  
});

router.get('/account/create',checkLoginMiddleware,(req,res,next)=>{
  res.render('create')
});

router.post('/account',checkLoginMiddleware,(req,res)=>{
  
  AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    if(err){
      res.status(500).send('失敗......');
      return;
    }
    res.render('success',{msg:'加入成功',url: '/account'});
  })
  
});

router.get('/account/:id',checkLoginMiddleware,(req,res)=>{
  let id = req.params.id;
  // db.get('accounts').remove({id:id}).write();
  AccountModel.deleteOne({_id:id},(err,data)=>{
    if(err){
      res.status(500).send('刪除失敗');
      return;
    }
    res.render('success',{msg: '刪除成功～～～', url:'/account'})
  })

})

module.exports = router;