import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import Subscriber from './Sections/Subscriber';
import SideVideos from './Sections/SideVideos';
import Comment from "./Sections/Comment";

//props는 Router에서 :id로 매핑시켜줬기 때문에 받을 수 있음
function DetailVideoPage(props) {

    console.log("props : ", props);


    //댓글에 달릴 고유 비디오 번호 Comment에 알려주기
    const videoId = props.match.params.videoId;
    const [Video, setVideo] = useState([]);

    //해당 게시물의 댓글 정보들 arr 
    const [Comments, setComments] = useState([]);

    const videoVariable = {
        videoId: videoId
    }
    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            });


        //비디오id로 비디오에 달린 답글 정보 가져오기
        axios.post("/api/comment/getComments", videoVariable).then((res) => {
            if (res.data.success) {
                //새로운 배열에 넣어주기
                setComments(res.data.comments);
            } else {
                alert("댓글 정보를 가져오는 데 실패했습니다.");
                return false;
            }
        });

    }, [])

    if (Video.writer) {

        //내가 작성한 게시물은 동영상이 안 보여야함
        //즉, 다른 사람이 업로드한 동영상만 보여야함
        const subscribeButton = Video.writer._id !== localStorage.getItem("userId") && (
            <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem("userId")} />
        );

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer?.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
                            />
                            <div></div>
                        </List.Item>

                        {/*Comment */}
                        <Comment
                            Comments={Comments}
                            videoId={videoId}
                        />

                    </div>
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideos />

                </Col>
            </Row>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default DetailVideoPage;
