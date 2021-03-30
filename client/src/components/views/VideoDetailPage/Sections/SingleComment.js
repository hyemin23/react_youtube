import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from "antd";

const { TextArea } = Input;

function SingleComment({ comment, videoId }) {

    const [OpenReply, setOpenReply] = useState(false);
    const [textInput, setTextInput] = useState("");

    //답글 클릭 상태에 따라 폼이 보여지거나 안 보여지게 할 수 있음.
    const onClick = (e) => {
        setOpenReply(prev => !prev);
    }


    const onHandleChange = (e) => {
        const { value } = e.target;
        setTextInput(value);

    }
    const onSubmit = (e) => {
        e.preventDefault();

    }

    //key 쪽에서 comment는 무슨 역할을 하는거지 ?
    // -> ant에서 그냥 사용하고 있음
    const actions = [
        <span onClick={onClick} key="comment-basic-reply-to">답글</span>
    ];

    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt="profile-image" />}
                content={comment.content}
            />

            {OpenReply &&
                <form style={{ display: "flex" }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: "100%", borderRadius: "5px" }}
                        placeholder="댓글입 입력해 주세요."
                        onChange={onHandleChange}
                        value={textInput}
                    />
                    <br />
                    <button style={{ width: "20%", height: "52px" }}
                        onClick={onSubmit}
                    >
                        등록
                </button>
                </form>
            }
        </div>
    )
}

export default SingleComment
