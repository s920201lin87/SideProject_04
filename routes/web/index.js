var express = require('express');
var router = express.Router();

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// const adapter = new FileSync(__dirname+'/../data/db.json')
// const db = low(adapter);
// const shortid = require('shortid');
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
//test moment
// console.log(moment('2025-02-24').toDate())
console.log(moment(new Date()).format('YYYY-MM-DD'));


router.get('/account', function(req, res, next) {
  // let accounts= db.get('accounts').value();
  AccountModel.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      res.status(500).send('讀取失敗');
      return;
    }
    console.log(data)
    res.render('list',{accounts:data,moment:moment});  
  })
  
});

router.get('/account/create',(req,res,next)=>{
  res.render('create')
});

router.post('/account',(req,res)=>{
  // let id = shortid.generate();
  // db.get('accounts').unshift({id:id,...req.body}).write();
  // console.log(req.body)
  //插入資料庫
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

router.get('/account/:id',(req,res)=>{
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
