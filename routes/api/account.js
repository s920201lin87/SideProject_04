const express = require("express");

//導入midlleware
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

const router = express.Router();
const jwt =require('jsonwebtoken')
const moment = require("moment");
const AccountModel = require("../../models/AccountModel");



// 取得帳號資料列表
router.get("/account", checkTokenMiddleware,async (req, res) => {
    AccountModel.find().sort({ time: -1 }).exec((err, data) => {
        if (err) {
            return res.status(500).json({
                code: "1001",
                msg: "讀取失敗",
                data: null
            });
        }
        res.json({
            code: "0000",
            msg: "讀取成功",
            data: data
        });
    });

    
});

// 新增帳號資料
router.post("/account", checkTokenMiddleware,async (req, res) => {
    try {
        const data = await AccountModel.create({
            ...req.body,
            time: moment(req.body.time).toDate(),
        });
        res.status(200).json({
            code: "0000",
            msg: "新增成功",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            code: "1002",
            msg: "新增錯誤",
            data: null
        });
    }
});

// 刪除指定 id 的帳號資料
router.delete("/account/:id",checkTokenMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await AccountModel.deleteOne({ _id: id });
        res.status(200).json({
            code: "0000",
            msg: "刪除成功",
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            code: "1003",
            msg: "刪除失敗",
            data: null
        });
    }
});

// 取得指定 id 的帳號資料
router.get("/account/:id",checkTokenMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await AccountModel.findById(id).exec();
        if (!data) {
            return res.status(404).json({
                code: "1004",
                msg: "找不到該筆資料",
                data: null
            });
        }
        res.status(200).json({
            code: "0000",
            msg: "成功讀取",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            code: "1004",
            msg: "讀取失敗",
            data: null
        });
    }
});

// 更新指定 id 的帳號資料
router.patch("/account/:id", checkTokenMiddleware,async (req, res) => {
    const { id } = req.params;
    try {
        await AccountModel.updateOne({ _id: id }, req.body);
        // 更新後再查詢一次，回傳最新資料
        const updatedData = await AccountModel.findById(id).exec();
        res.status(200).json({
            code: "0000",
            msg: "成功更新",
            data: updatedData
        });
    } catch (err) {
        res.status(500).json({
            code: "1005",
            msg: "更新失敗",
            data: null
        });
    }
});

module.exports = router;
