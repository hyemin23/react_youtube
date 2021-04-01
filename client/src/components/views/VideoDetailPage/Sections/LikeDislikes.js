import { Icon, message, Tooltip } from 'antd'
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


    //손가락 버튼 클릭 시
    const onLike = () => {

        //좋아요 상태가 false면
        //Like 상태가 클릭이 안되어 있는 상태이고, 클릭했을 때 "1" 올려줘야함.
        if (!likeCheck) {
            //variable 상태에 따라서 비디오,댓글 좋아요인지 판단해서 결과 값을 받아옴.
            Axios.post("/api/like/upLike", variable).then((res) => {
                if (res.data.success) {
                    console.log("좋아요 올리기");

                    //like 정보 1 올려주기
                    setLikes(likes + 1);
                    //클릭한 상태로 만들어주기
                    setLikeCheck(true);

                    //만약 싫어요(dislike)가 클릭이 되어있다면 
                    if (DislikeCheck) {
                        //싫어요 버튼을 클릭이 안되어있게 하고 숫자 -1 시켜주기
                        setDislikeCheck(false);
                        setDislikes(DislikeCheck - 1);

                    }

                } else {
                    message.warning("like를 올리지 못 하였습니다.");
                }
            })
        }
        //좋아요 상태가 true라면
        //즉,좋아요가 되어있는데 클릭을 했다면 좋아요 내리기
        else {
            Axios.post("/api/like/unLike", variable).then((res) => {
                if (res.data.success) {
                    console.log("좋아요 내리기");
                    //좋아요 내리기
                    setLikes(likes - 1);
                    //클릭을 안 한 상태로 만들어주기
                    setLikeCheck(false);
                } else {

                    message.warning("like를 내리지 못 하였습니다.")
                }
            })
        }
    }


    //싫어요 손가락 클릭 시 
    const onDisLike = () => {

    }




    return (
        !likeCheck && !DislikeCheck && (
            <div>
                <span key="comment-basic-like" >
                    <Tooltip title="좋아요">
                        <Icon type="like" theme={likes ? "filled" : "outlined"}
                            onClick={onLike}
                        />
                    </Tooltip>
                </span>
                <span stlyle={{ paddingLeft: "8px", cursor: "auto" }}>
                    {likes}
                </span>

                <span key="comment-basic-dislike" >
                    <Tooltip title="싫어요">
                        <Icon type="dislike" theme={Dislikes ? "filled" : "outlined"}
                            onClick={onDisLike}
                        />
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
