const express = require('express')
const app = express()
const cors = require("cors")
const multer =  require("multer")
const path = require('path')
const fs = require('fs')
const dayjs = require("dayjs")
const tools = require("./src/tools/tools")
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
const port = 3000
// let objMulter = multer({ dest: "./public/upload" });
// app.use(objMulter.any())
app.use(express.static(path.join(__dirname,'./public')))
console.log(path.join(__dirname,'./public'))
const storage = multer.diskStorage({
    // 配置文件上传后存储的路径
    destination: function (req, file, cb) {
        // NodeJS的两个全局变量
        // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
        // console.log(__filename); //获取当前文件在服务器上的完整路径 
        cb(null, path.join(__dirname,'./public/upload'))
    },
    // 配置文件上传后存储的路径和文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + path.extname(file.originalname)) 
    }
})
const upload = multer({ storage: storage })
// 上传的名称要统一
// app.post("/api/upload",upload.single('usericon'),(req,res)=>{
//     console.log(req.file)
//     res.send({
//         msg:"上传成功",
//         pathImg:'http://localhost:3000/upload/'+req.file.filename
//     })
// })

app.post("/api/upload",tools.multerFun().single('usericon'),(req,res)=>{
    console.log(req.file)
    res.send({
        msg:"上传成功",
        pathImg:'http://localhost:3000/upload/'+req.file.filename //返回的文件在服务器的位置
    })
})
app.listen(port, () =>{
	//启动服务的时候会调用
    console.log(`Example app listening on port ${port}!`);
    console.log(dayjs().format('YYYY_MM_DD'));
} )