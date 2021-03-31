import React from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ CommentLists, refreshFunction, videoId }) {

    //CommentLists -> 게시물에 달린 댓글들.
    const renderReplyComment = (parentCommentId) =>
        CommentLists.map((comment, index) => (
            //게시물의 댓글에 대한 답글들이 있는 경우에만 출력
            <React.Fragment key={index}>
                {/*
                responseTo는 댓글의 Id 값
                parentCommentId는 현재 답글 기준으로 상위 댓글의 Id 값
                */}
                {comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={refreshFunction} comment={comment} videoId={videoId} />
                        <ReplyComment />
                    </div>
                }
            </React.Fragment>
        ));

    const onClick = (e) => {
    }

    return (
        <div>
            <p
                onClick={onClick}
                style={{
                    fontSize: '14px'
                    , margin: 0
                    , color: "gray"
                    , cursor: "pointer"
                }}>
                1개의 댓글 더 보기
            </p>
            {renderReplyComment()}

        </div>
    )
}

export default ReplyComment
