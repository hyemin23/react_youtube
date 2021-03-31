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


            {
                /*
                Comment Lists (댓글 리스트들)
                댓글(Comment)는 SingleComment(댓글리스트)와 ReplyComment(댓글의 답글리스트)를 갖는다.
                
                ! 여기서, SingleComment(댓글 리스트)는 게시물에 대한 각각의 댓글의 정보와 자기 댓글에 대한 form을 뿌려준다.
                
                ! ReplyComment(댓글의 답글 리스트)댓글들의 여러 답글들을 뿌려준다.
                또한 댓글의 답글은 여러 답글들에 대해 댓글을 달 수 있다.
                답글은 현재 답글에 대해 답글을 달 수 있고 답글의 부모에 대한 댓글이 달릴 수 있다.
                */
            }

            {Comments && Comments.map((comment, index) => (
                //댓글의 주인 있을 경우에만
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment key={index} comment={comment} videoId={videoId} />

                        {/*
                    ReplyComment는 댓글들에 대한 답글 Component이다.
                    여기서는 인자를 각각의 게시물에 대한 각각의 댓글들(Comments배열)의 정보를 줘야함.
                    ->이유 : 그 댓글들의 답글들을 확인해야 하므로
                    */}
                        <ReplyComment CommentLists={Comments} refreshFunction={refreshFunction} videoId={videoId} />
                    </React.Fragment>
                )
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