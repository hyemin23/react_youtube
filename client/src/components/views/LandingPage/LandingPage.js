
import { Avatar, Col, Row, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import moment from 'moment';
const { Title } = Typography;


function LandingPage() {

    const [Video, setVideo] = useState([]);


    useEffect(() => {
        Axios.get("/api/video/getVideos").then(res => {
            if (res.data.success) {
                //console.log(res);
                setVideo(res.data.videos);
            } else {
                alert("비디오 가져오기를 실패했습니다.")
            }
        })
    }, []);

    const renderCards = Video.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));


        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: "relative" }}>
                    <a href={`/video/${video._id}`} >
                        <img style={{ width: "100%" }} src={`http://localhost:5000/${video.thumbnail}`} alt="썸네일" />
                        <div className="duration">
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </a>
                </div>

                <br />
                <Meta avatar={<Avatar src={video.writer.image} />}
                    title={video.title}
                    description=""
                />

                <span>{video.writer.name}</span>
                <br />
                <span style={{
                    marginLeft: "2rem"
                }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
        );

    });

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <Title level={2}> Recommended</Title>
            <hr />

            <Row gutter={[32, 16]}>
                {renderCards}

            </Row>


            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </div>
    )
}

export default LandingPage
