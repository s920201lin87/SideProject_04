var express = require('express');
var router = express.Router();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__dirname+'/../data/db.json')
const db = low(adapter);
const shortid = require('shortid');


router.get('/account', function(req, res, next) {
  let accounts= db.get('accounts').value();
  res.render('list',{accounts:accounts});
});

router.get('/account/create',(req,res,next)=>{
  res.render('create')
});

router.post('/account',(req,res)=>{
  let id = shortid.generate();
  db.get('accounts').unshift({id:id,...req.body}).write();
  res.render('success',{msg:'加入成功',url: '/account'});
});

router.get('/account/:id',(req,res)=>{
  let id = req.params.id;
  db.get('accounts').remove({id:id}).write();
  res.render('success',{msg: '刪除成功～～～', url:'/account'})

})

module.exports = router;
