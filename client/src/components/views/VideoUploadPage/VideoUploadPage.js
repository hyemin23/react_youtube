import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;


function UploadVideoPage() {


    const handleChangeTitle = (event) => {

    }

    const handleChangeDecsription = (event) => {
    }

    const handleChangeOne = (event) => {
    }

    const handleChangeTwo = (event) => {
    }

    const onSubmit = (event) => {

        event.preventDefault();


    }

    const onDrop = (files) => {


    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>



                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value
                />
                <br /><br />

                <select onChange={handleChangeOne}>

                </select>
                <br /><br />

                <select onChange={handleChangeTwo}>

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