import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ commentLists, refreshFunction, videoId, parentCommentId }) {

    console.log("코멘트 리스트들 : ", commentLists);


    //딥글 개수
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    //답글 form open 여부
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    useEffect(() => {

        let commentNumber = 0;
        commentLists.map((comment) => {
            if (comment.responseTo === parentCommentId) {
                commentNumber++;
            }
        });
        setChildCommentNumber(commentNumber);

    }, [commentLists]);

    //CommentLists -> 게시물에 달린 댓글들.
    //게시물의 댓글에 대한 답글들이 있는 경우에만 출력
    const renderReplyComment = (parentCommentId) =>
        commentLists.map((comment, index) => (

            <React.Fragment key={index}>
                {/*
                responseTo는 대댓글이 존재하면 즉, 상위 댓글의 id 값을 의미.
                parentCommentId는 현재 답글 기준으로 상위 댓글의 Id 값
                서로 일치하면 뿌려주기
                */}

                {comment.responseTo === parentCommentId && (
                    <div style={{ width: "80%", marginLeft: "40px" }}>
                        <SingleComment
                            comment={comment}
                            refreshFunction={refreshFunction}
                            videoId={videoId} />

                        {/*자기 자신을 스스로 참조해서 댓글의 답글들을 출력 */}
                        <ReplyComment
                            refreshFunction={refreshFunction}
                            commentLists={commentLists}
                            parentCommentId={comment._id}
                            videoId={videoId}
                        />
                    </div>
                )}
            </React.Fragment>
        ));



    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };

    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p
                    onClick={onHandleChange}
                    style={{
                        fontSize: '14px'
                        , margin: 0
                        , color: "gray"
                        , cursor: "pointer"
                    }}>
                    {ChildCommentNumber}개의 댓글 더 보기
                </p>
            )}

            {/* 자기 답글의 부모 댓글의 id 값을 넣어줌 */}
            {OpenReplyComments && renderReplyComment(parentCommentId)}

        </div>
    );
}

export default ReplyComment;
