const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");

/*
    =======================
            Comment
    =======================
*/

router.post("/saveComment", (req, res) => {

    //req.body에 담긴 정보로 (variables가 들어있음) 새로운 comment 객체 만들어서 저장
    const comment = new Comment(req.body);

    //err, comment 정보가 옴
    comment.save((err, comment) => {
        if (err) return res.json({
            success: false
            , err
        });

        //그냥 comment로만 적어주면 writer의 모든 정보를 가져올 수 없음 
        //지금까지는 populate('writer')를 사용해서 가져왔는데
        //populdate()는 ObjectId를 객체로 치환해주는 역할을 함.

        //댓글을 저장할 때 variables 변수안에 writer 정보에 user.userData._id 즉, 리덕스에서 꺼내온 유저들의 정보가 담겨있음 
        //해당 정보를 comment안에 포함 시켜서 뿌려주는데 여러 객체들을 ObbjectId하나안에 담았기 때문에 populate()를 사용하여서 풀어서 return 해야함..

        //save()에서는 그것이 불가능함
        //그것의 대안으로서는 
        return res.status(200).json({
            success: true
            , comment
        });
    });

});

module.exports = router;

