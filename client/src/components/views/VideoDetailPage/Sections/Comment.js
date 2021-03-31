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
        const { value } = e.target;
        setcommentValue(value);
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
            <p>댓글목록</p>
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

            {Comments &&
                Comments.map(
                    (comment, index) =>


                        // 첫 댓글 진입
                        //즉, 전체 comment talbe에서 전체 data(등록한 모든)가 아닌 responseTo(상태값 :답글)가 아닌 애들은 일단 제외하고 댓글들만 출력
                        !comment.responseTo && (
                            <React.Fragment key={index}>
                                {/*비더오에 대한 댓글 출력 */}
                                <SingleComment key={index} comment={comment} videoId={videoId}
                                    refreshFunction={refreshFunction}
                                />

                                {/*
                    비디오의 댓글에대한 답글 출력 여기서 답글 출력하는 게 아니라 Reply 컴포넌트 안에서 댓글의 답글들을 뿌려야함. 여기는 답글들을 뿌리기 위한 정보들만 넘겨주기.
                    ->이유 : 그 댓글들의 답글들을 확인해야 하므로
                    */}

                                <ReplyComment commentLists={Comments} refreshFunction={refreshFunction} videoId={videoId} parentCommentId={comment._id} />
                            </React.Fragment>
                        )
                )}



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