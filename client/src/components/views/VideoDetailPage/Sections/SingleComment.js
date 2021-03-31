import React, { useState } from 'react'
import { Comment, Avatar, Button, Input, message } from "antd";
import { useSelector } from 'react-redux';
import Axios from 'axios';

const { TextArea } = Input;

//댓글의 답글부분
function SingleComment({ comment, videoId }) {

    const [OpenReply, setOpenReply] = useState(false);
    const [textInput, setTextInput] = useState("");
    const user = useSelector((state) => state.user);

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

        //댓글의 답글 입력
        //여기서 이제 responseTo가 입력됨.
        //comment.id는 각각의 SingleComment가 생성이 되면서 주어진 commnet._id가 setting됨.
        const variables = {
            content: textInput
            , writer: user.userData._id
            , videoId: videoId
            , responseTo: comment._id
        };

        Axios.post("/api/comment/saveComment", variables).then((res) => {
            console.log(res);
            if (res.data.success) {
                message.success("댓글이 등록 되었습니다!");

                //form 가리기
                setOpenReply(prev => !prev);
            } else {
                message.warning("댓글 등록에 실패하였습니다!");
                return false;
            }
        });

        setTextInput("");
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
