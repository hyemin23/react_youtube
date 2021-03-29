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

        return <div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
            <div style={{ width: '40%', marginRight: '1rem' }}>
                <a href={`/video/${video._id}`} style={{ color: 'gray' }}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{ width: '50%' }}>
                <a href={`/video/${video._id}`} style={{ color: 'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                    <span>{video.writer.name}</span><br />
                    <span>{video.views}</span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })



    return (<><div style={{ marginTop: "3rem" }}>{renderSideVideo}</div></>)
}

export default SideVideos;
