var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/account', function(req, res, next) {
  res.render('list');
});
router.get('/account/create',(req,res,next)=>{
  res.render('create')
})
router.post('/account',(req,res)=>{
  console.log(req.body);
  res.send('加入紀錄');
});
module.exports = router;
