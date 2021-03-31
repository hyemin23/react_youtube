import { Icon, Tooltip } from 'antd'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function LikeDislikes(props) {

    let variable = {};

    //좋아요 관련
    const [likes, setLikes] = useState(0);
    const [likeCheck, setLikeCheck] = useState(false);

    //싫어요 관련
    const [Dislikes, setDislikes] = useState(0);
    const [DislikeCheck, setDislikeCheck] = useState(false);

    //비디오 좋아요
    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    }
    //댓글 좋아요
    else {
        variable = { commentId: props.commentId, userId: props.userId }
    }


    useEffect(() => {
        //좋아요 가져오기
        Axios.post("/api/like/getLikes", variable).then(res => {
            if (res.data.success) {
                console.log("좋아요결과:", res.data);
                let matchLike = res.data.likes;

                //얼마나 많은 좋아요를 받았는지
                setLikes(matchLike.length);

                //좋아요를 눌렀는지 check!
                matchLike.map(like => {
                    //좋아요 중 내가 좋아요를 했다면
                    if (like.userId === props.userId) {
                        setLikeCheck(true);
                    } else {
                        setLikeCheck(false);
                    }
                });
            } else {
                alert("좋아요 정보를 가져오기 못 했습니다.");
                return false;
            }
        });

        //싫어요 가져오기
        Axios.post("/api/like/getDislikes", variable).then(res => {
            if (res.data.success) {

                console.log("싫어요 결과 : ", res.data);
                let matchDislike = res.data.dislikes;

                //싫어요 값 setting
                setDislikes(matchDislike.length);

                //싫어요를 눌렀는지 확인
                matchDislike.map((dislike) => {
                    if (dislike.userId === props.userId) {
                        setDislikeCheck(true);
                    } else {
                        setDislikeCheck(false);
                    }
                });

            } else {
                alert("싫어요 가져오기 실패");
            }
        });
    }, []);


    return (
        !likeCheck && !DislikeCheck && (
            <div>
                <span key="comment-basic-like" >
                    <Tooltip title="좋아요">
                        <Icon type="like" theme={likes ? "filled" : "outlined"} />
                    </Tooltip>
                </span>
                <span stlyle={{ paddingLeft: "8px", cursor: "auto" }}>
                    {likes}
                </span>

                <span key="comment-basic-dislike" >
                    <Tooltip title="싫어요">
                        <Icon type="dislike" theme={Dislikes ? "filled" : "outlined"} />
                    </Tooltip>
                </span>
                <span stlyle={{ paddingLeft: "8px", cursor: "auto" }}>
                    {Dislikes}
                </span>

            </div>
        )
    )
}

export default LikeDislikes;
