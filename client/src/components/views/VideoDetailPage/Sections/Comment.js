import { message } from 'antd';
import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
function Comment(videoId) {

    const [areaInput, setAreaInput] = useState("");

    //useSelector Hook 을 사용하려 redux에 있는 정보 가져오기
    const user = useSelector(state => state.user);

    const onChange = (e) => {
        const { value } = e.target;
        setAreaInput(value);
    }
    const onSubmit = (e) => {
        e.preventDefault();

        //댓글 정보 변수
        const variables = {
            content: areaInput
            , writer: user.userData._id
            , postId: videoId
        };


        //댓글 정보 저장
        Axios.post("/api/comment/saveComment", variables).then((res) => {
            if (res.data.success) {
                console.log(res.data);
                message.success("댓글 저장 성공!");

            } else {
                console.log(res.data.err.message);
                message.warning("댓글 저장 실패");
                return false;
            }
        })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/*Comment 리스트 */}

            {/* Root Comment Form */}
            <form style={{ display: "flex", }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: "100%", borderRadius: "5px" }}
                    onChange={onChange}
                    value={areaInput}
                    placeholder="댓글을 입력해주세요."
                />
                <br />

                <button style={{ width: "20%", height: "52px", borderRadius: "5px" }} onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Comment
