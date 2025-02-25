const express = require("express");
const router = express.Router();

const moment = require("moment");
const AccountModel = require("../../models/AccountModel");

console.log(moment(new Date()).format("YYYY-MM-DD"));

//list
router.get("/account", function (req, res, next) {
    // let accounts= db.get('accounts').value();
    AccountModel.find()
        .sort({ time: -1 })
        .exec((err, data) => {
            if (err) {
                // res.status(500).send("讀取失敗");
                res.json({
                    code:"1001",
                    msg:"讀取失敗",
                    data:null
                })
                return;
            }
            console.log(data);
            res.json({
                code:'0000', 
                msg:'讀取成功',
                data:data
            })
        });
});

//add
router.post("/account", (req, res) => {
    // let id = shortid.generate();
    // db.get('accounts').unshift({id:id,...req.body}).write();
    // console.log(req.body)
    //插入資料庫
    AccountModel.create(
        {
            ...req.body,
            time: moment(req.body.time).toDate(),
        },
        (err, data) => {
            if (err) {
                res.json({
                    code:"1002",
                    msg:"新增錯誤",
                    data:null
                })
                return;
            }
            res.json({
                code:"0000",
                msg:"新增成功",
                data:data     
            })
        }
    );
});

//delete id
router.delete("/account/:id", (req, res) => {
    let id = req.params.id;
    // db.get('accounts').remove({id:id}).write();
    AccountModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({
                code:"1003",
                msg:"刪除失敗",
                data:null
            })
            return;
        }
        res.json({
            code:"0000",
            msg:"刪除成功",
            data:{}
        })
    });
});

//find id 
router.get('/account/:id',(req,res) => {
    let {id} = req.params;
    AccountModel.findById(id,(err,data)=>{
        if(err){
            return res.json({
                code:"1004",
                msg:"讀取失敗",
                data:null
            })
            
        }
        
        res.json({
            code:"0000",
            msg:"成功讀取",
            data:data
        })
    })
})

//update
router.patch("/account/:id",(req,res) => {
    let {id} = req.params;
    AccountModel.updateOne({_id: id},req.body,(err,data)=>{
        if(err){
            return res.json({
                code:"1005",
                msg:"更新失敗",
                data:null
            })
        }
        AccountModel.findById(id,(err,data)=>{
            if(err){
                return res.json({
                    code:"1004",
                    msg:"讀取失敗",
                    data:null
                })
                
            }
            res.json({
                code:"0000",
                msg:"成功更新",
                data:data
            })

        })
        
    })
})


module.exports = router;
