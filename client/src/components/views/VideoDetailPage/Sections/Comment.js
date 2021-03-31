import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment({ videoId, Comments, refreshFunction }) {

    const user = useSelector((state) => state.user);
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            videoId: videoId,
        };

        axios.post("/api/comment/saveComment", variables).then((response) => {
            if (response.data.success) {
                message.success("댓글을 성공적으로 저장했습니다!");
                setcommentValue("");

                //새로고침
                //인자로는 새로고침한 save 정보들을 돌려받은 최신 정보들을 넣어준다.
                refreshFunction(response.data.result);
            } else {
                message.warning("댓글을 저장하지 못 했습니다.");
                return false;
            }
        });
    };

    return (
        <div>
            <br />
            <p>댓글</p>
            <hr />

            {/* Comment Lists */}
            {Comments && Comments.map((comment, index) => (
                <>
                    <SingleComment key={index} comment={comment} videoId={videoId} />
                    <ReplyComment />
                </>
            ))}



            {/* Root Comment Form */}
            <form style={{ display: "flex", marginTop: "18px" }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해주세요"
                />
                <br />
                <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Comment;