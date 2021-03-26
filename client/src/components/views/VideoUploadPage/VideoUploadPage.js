import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from "react-dropzone";
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;


const PrivateOptions = [
    { value: 0, label: "Private" }
    , { value: 1, label: "Pubic" }
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]


function UploadVideoPage() {

    //store에 있는 user 정보 가져오기
    const user = useSelector(state => state.user);

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

    //썸네일 정보
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");


    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setVideoTitle(value);
        } else if (name === "des") {
            setDescription(value);
        } else if (name === "private") {
            setPrivate(value);
        } else if (name === "category") {
            setCategory(value);
        }


    }


    const onDrop = (files) => {

        let formData = new FormData;

        //파일을 보낼 땐 content-type을 명시해줘야함
        const config = {
            header: { "content-type": "multipart/form-data" }
        }

        formData.append("file", files[0]);

        //파일or동영상 업로드
        Axios.post("/api/video/uploadfiles", formData, config).then(res => {

            //파일 전송이 성공한 경우에
            if (res.data.success) {
                console.log(res.data);

                let variable = {
                    url: res.data.url
                    , fileName: res.data.fileName
                }

                setFilePath(res.data.url);



                //썸네일
                Axios.post("/api/video/thumbnail", variable).then((res) => {
                    if (res.data.success) {
                        console.log("썸네일 업로드 성공");
                        console.log(res.data);
                        setDuration(res.data.fileDuration);
                        setThumbnailPath(res.data.thumbsFilePath);

                    } else {
                        alert("썸네일 생성에 실패했습니다.");
                    }
                })
            } else {
                alert("업로드를 실패했습니다.");
            }
        });
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const info = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }

        console.log(info);

        Axios.post("/api/video/uploadVideo", info).then((res) => {
            if (res.data.success) {
                alert("성공");
            } else {
                alert("비디오 업로드 실패했습니다.");
            }
        })

    }



    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>

                <Title level={2} > Upload Video</Title>

                <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>

                {/*썸네일 */}
                {ThumbnailPath && (
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="썸네일" />
                    </div>
                )}

            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>



                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={onChange}
                    name="title"
                    value={VideoTitle}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={onChange}
                    name="des"
                    value={Description}
                />
                <br /><br />

                <select onChange={onChange} name="private">
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={onChange} name="category">
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>

            </Form>
        </div>
    )
}

export default UploadVideoPage