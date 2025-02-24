
/**
 * @param {*} success
 * @param {*} error
*/
module.exports = function(success,error){
    const mongoose = require('mongoose');
    const {DBhost,DBname,DBport} = require('../config/config.js')

    mongoose.connect(`mongodb://${DBhost}:${DBport}/${DBname}`)

    mongoose.connection.once('open',()=>{
        success();
        console.log('連接mongodb........');
    });

    mongoose.connection.on('error',()=>{
        error();
        console.log('連接錯誤........!!!!!');
    });

    mongoose.connection.on('close',()=>{
        console.log('connection close......')
    });
}

