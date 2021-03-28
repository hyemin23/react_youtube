import { Avatar, Col, List, Row } from 'antd'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import SideVideos from './Section/SideVideos';

function VideoDetailPage(props) {

    //비디오 정보 담기
    const [Video, setVideo] = useState([]);

    //여기서 porps는 App에서 Router안에 들어있는 객체들이다 .
    //자세한 건 즐겨찾기 페이지에서 확인하기. (중첩 라우트)
    const videoId = props.match.params.videoId;
    const videoVariable = {
        videoId: videoId
    };

    //선택한 비디오 가져오기
    useEffect(() => {
        console.log("userEffect 페이지 입니다.");
        Axios.post("/api/video/getVideo", videoVariable).then((res) => {
            if (res) {
                return setVideo(res.data.video)
            }
            else {
                return alert("비디오를 가져오는데 실패했습니다!")
            }
        });
    }, []);


    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={18}>
                <div style={{ width: '100%', padding: "3rem 4rem" }}>
                    <video style={{ width: "100%" }} src={`http://localhost:5000/${Video.filePath}`} controls />

                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={Video.writer?.image} />}
                            title={Video.writer?.name}
                            description={Video.description}
                        />

                    </List.Item>
                    {/*Comments*/}
                </div>
            </Col>

            {/*사이드 비디오 */}
            <Col>
                <SideVideos />
            </Col>
        </Row>
    )
}

export default VideoDetailPage
