import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import Subscriber from './Sections/Subscriber';
import SideVideos from './Sections/SideVideos';
function DetailVideoPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

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
            })


    }, [])

    console.log("Video 정보 : , ", Video.writer?._id);

    if (Video.writer) {

        //구독자의 아이디와 글쓴이의 id가 다르면
        const subscribeButton = Video.writer._id !== localStorage.getItem("userId") && <Subscriber userTo={Video.writer._id} userFrom={localStorage.getItem("userId")} />;

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

export default DetailVideoPage
