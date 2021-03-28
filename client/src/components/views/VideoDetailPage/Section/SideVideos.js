import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function SideVideos() {

    const [SideVideos, setSideVideos] = useState([]);

    //사이드 랜딩페이지 동영상 모두 가져오기
    useEffect(() => {
        Axios.get("/api/video/getVideos").then(res => {
            if (res.data.success) { setSideVideos(res.data.videos) }
            else {
                return alert("사이드 비디오 가져오기 실패")
            }
        });
    }, []);

    //반복으로 모든 비디오 출력
    const renderSideVideo = SideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (
            <div key={index}
                style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}>
                <div style={{ width: "100%", marginBottom: "1rem", height: "100%", marginRight: "1rem" }}>
                    <a href style={{ color: "gray" }}>
                        <img style={{ width: "100%" }} src={`http://localhost:5000/${video.thumbnail}`} alt="사이드 썸네일" />
                    </a>
                </div>

                <div style={{ width: "50%" }}>
                    <a href style={{ color: "gray" }}>
                        <sapn style={{ fontSize: "1rem", color: "black" }}>
                            {video.title}
                        </sapn>
                        <br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views}회 시청</span><br />
                        <span>{minutes} : {seconds}</span>
                    </a>
                </div>
            </div>
        );
    });



    return (<><div style={{ marginTop: "3rem" }}>{renderSideVideo}</div></>)
}

export default SideVideos
