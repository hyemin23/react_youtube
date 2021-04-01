const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

/*
    =======================
            like
    =======================
*/


//좋아요 정보 가져오기
router.post("/getLikes", (req, res) => {
    let variable = {};

    //비디오 좋아요 일 경우
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId };
    }
    //댓글 좋아요
    else {
        variable = { commentId: req.body.commentId };
    }

    //좋아요 개수 가져오기
    Like.find(variable).exec((err, likes) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true
            , likes
        });
    });
});


//싫어요 정보 가져오기 
router.post("/getDislikes", (req, res) => {

    let variable = {};

    //비디오 싫어요일 경우
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    }
    //댓글 싫어요
    else {
        variable = { commentId: req.body.commentId }
    }

    //싫어요 개수 가져오기
    Dislike.find(variable).exec((err, dislikes) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true
            , dislikes
        });
    });
});


//좋아요 올리기
router.post("/upLike", (req, res) => {
    console.log("좋아요 올리기");

    let variable = {};

    //비디오 좋아요 버튼인지
    if (req.body.videoId) {
        variable = {
            videoId: req.body.videoId
            , userId: req.body.userId
        };
    }
    //댓글 좋아요 버튼인지
    else {
        variable = { commentId: req.body.commentId, userId: req.body.uesrId };
    }

    //Like collection에 좋아요 정보를 저장하는 과정
    const like = new Like(variable);
    like.save((err, likeResult) => {
        if (err) return res.status(400).send(err);

        //만약, dislike가 클릭되어있다면 dislike를 1 줄여준다.
        Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({
                success: true
            })
        })
    })
});



router.post("/upDislike", (req, res) => {
    let variable = {};

    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
    // DisLike collection에다가 클릭 정보를 넣어준다.
    const dislike = new Dislike(variable);

    dislike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        // 만약에 Dislike 이 이미 클릭이 되어있다면, Dislike을 1 줄여준다.
        Like.findOneAndDelete(variable).exec((err, disLikeResult) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true });
        });
    });
});




//좋아요 내리기
router.post("/unLike", (req, res) => {
    console.log("좋아요 내리기")
    let variable = {};

    //비디오 좋아요 버튼인지
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.uesrId }
    }
    //댓글 좋아요 버튼인지
    else {
        variable = { commentId: req.body.commentId, userId: req.body.uesrId }
    }

    //Like collection에서 좋아요 정보 지워주기
    Like.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({
            success: false
            , err
        });
        return res.status(200).json({
            success: true
            , result
        });
    });
});



//싫어요 올리기
router.post("/upDisLike", (req, res) => {

    console.log("싫어요 올리기");

    let variable = {};

    //비디오 싫어요 버튼인지
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    //싫어요 정보 저장
    const dislike = new Dislike(variable);

    dislike.save((err, dislikeResult) => {
        if (err) return res.status(400).send(err);

        //만약 싫어오 버튼을 눌렀는데 좋아요 버튼이 눌러져 있다면
        //좋아요 버튼의 동일한 userId의 좋아요를 하나 지워준다.
        Like.findOneAndDelete(variable).exec((err, result) => {
            if (err) return res.status(400).json({
                success: false
                , err
            });
            return res.status(200).json({
                success: true
                , result
            })
        });
    });
});



//싫어요 내리기
router.post("/undisLike", (req, res) => {
    console.log("싫어요 내리기");
    let variable = {};


    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    //기존 싫어요 collection 에서 싫어오 정보 추출해서 빼내기
    Dislike.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
    });
});

module.exports = router;

