const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
const { Video } = require("../models/Video");

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
    let variable = {};

    //비디오 좋아요
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    }
    //댓글 좋아요
    else {
        variable = { commentId: req.body.commentId }
    }

    //Like collection에 좋아요 정보를 저장하는 과정
    const like = new Like(variable);
    like.save((err, likeResult) => {
        if (err) return res.status(400).send(err);

        //만약, dislike가 클릭되어있다면 dislike를 1 줄여준다.
        Dislike.findByIdAndDelete(variable).exec((err, disLikeResult) => {
            if (err) return res.status(400).send(400);
            return status(200).json({
                success: true
            })
        })
    })
});

//좋아요 내리기
router.post("/upLike", (req, res) => {
    let variable = {};

    //비디오 싫어요
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId }
    }
    //댓글 싫어요
    else {
        variable = { commentId: req.body.commentId }
    }

    //Like collection에서 좋아요 정보 지워주기
    Like.findByIdAndDelete(variable).exec((err, result) => {
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


module.exports = router;

