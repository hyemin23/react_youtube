const express = require('express');
//라우터 객체를 만듬
const router = express.Router();
//const { Video } = require("../models/User");
//const { auth } = require("../middleware/auth");

const multer = require("multer");
const path = require('path');
var ffmpeg = require("fluent-ffmpeg");
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');


//=================================
//             Video
//=================================

//STORAGE MULTER CONFIG
//npm install multer --save
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
});

router.post("/thumbnail", (req, res) => {

    console.log("썸네일 서버 들어옴");
    let filePath = "";
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (errr, metadata) {
        console.log("썸네일정보")
        //console.dir(metadata);
        //console.log(metadata.format.duration); //동영상 길이
        fileDuration = metadata.format.duration;
    })


    //썸네일 생성 
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');

            return res.json({
                success: true
                , thumbsFilePath: thumbsFilePath
                , fileDuration: fileDuration
            });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png'
        });

});


//비디오 정보 DB에 저장
router.post("/uploadVideo", (req, res) => {

    console.log("비디오 디비 저장");
    //인스턴스 생성
    //새로운 비디오 정보를 만든다
    //req.body == 모든 정보가 담김 client쪽에서 보내는 (info변수)
    const videoInfo = new Video(req.body);
    videoInfo.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true });
    });
});


//메인페이지 로딩시 비디오들 가져오기
router.get("/getVideos", (req, res) => {

    //Video Collection안에 있는 모든 비디오를 가져오기
    //그 안에서 populdate()메서드를 활용하여 그 비디오 안에 모든 유저정보를 가져올 수 있음.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({
                success: true
                , videos
            })
        })
});

//개별적인 비디오 생성하기
router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                success: true
                , video
            });
        });
});

//구독한 비디오 목록 가져오기
router.post("/getSubscriptionVideos", (req, res) => {

    //자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscriberInfo) => {

        let subscriberUser = [];

        subscriberInfo.map((subscriber, index) => {
            subscriberUser.push(subscriber.userTo);
        });

        //찾은 사람들의 비디오를 가지고 온다.
        //$in : subscriberUser 안에 있는 모든 유저들을 갖고 탐색 가능
        //(주의 : req.body.id 로 찾으면 안됨 이건 단건 검색일 경우에만 먹힘)
        Video.find(
            { writer: { $in: subscriberUser } })
            .populate("writer")
            .exec((err, videos) => {
                if (err) return res.status(400).send(err);

                res.status(200).json({
                    success: true
                    , videos
                });
            })
    });

    //찾은 사람들의 비디오를 가지고 온다.


});

module.exports = router;