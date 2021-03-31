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


module.exports = router;

