const express = require('express');
//라우터 객체를 만듬
const router = express.Router();
//const { Video } = require("../models/User");

//const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require('path');

//=================================
//             Video
//=================================

//STORAGE MULTER CONFIG
var storage = multer.diskStorage({
    //어디에 저장할지
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    //어떤 파일이름으로 저장을 할 것인지.
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        //확장자 판단
        const ext = path.extname(file.originalname)
        console.log("확장자 :", ext);

        //.jpg가 아니면 에러전달
        if (ext !== '.jpg') {
            return cb(res.status(400).end('only .jpg is allowed'), false);
        }

        //사진이면 진행
        cb(null, true);
    }
});

//파일은 1개만 넣겠다는 의미 single
//storage 위에서 설정한 option들
const upload = multer({
    storage: storage
}).single("file");



//index.js에서 /api/video 로 설정해줬기 때문에
//앞에 경로는 안 적어줘도 됨.
router.post("/uploadfiles", (req, res) => {

    console.log("upload들어옴");

    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if (err) {
            return res.json({
                success: false
                , err
            });
        }

        //에러가 없을 경우
        //url : 파일 경로

        return res.json({
            success: true
            , url: res.req.file.path
            , fileName: res.req.file.filename
        });


    })
    //npm install multer --save

});



module.exports = router;