const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");

/*
    =======================
            Comment
    =======================
*/

router.post("/saveComment", (req, res) => {
    console.log("saveComment 들어옴 ");
    const comment = new Comment(req.body);
    comment.save((err, comment) => {

        if (err) return res.json({ success: false, err });

        Comment.find({ _id: comment._id })
            .populate("writer")
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json({ success: true, result });
            });
    });
});

//비디오에 달린 댓글들 가져오기
router.post("/getComments", (req, res) => {

    //req에서 넘어온 비디오Id로 Comment의 비디오 Id에 달린 정보들을 가져옴
    //그 정보들중 populate 필터를 거쳐 writer 정보들만 객체로 뿌랴줌
    Comment.find({
        videoId: req.body.videoId
    }).populate("writer").exec((err, comments) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({
            success: true
            , comments
        });
    });
});
module.exports = router;

