
import { Col, Row, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react'
import { FaCode } from "react-icons/fa";

const { Title } = Typography;
function LandingPage() {


    const renderCards = '';

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <Title level={2}> Recommended</Title>
            <hr />

            <Row gutter={[32, 16]}>
                {renderCards}
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: "relative" }}>
                        <div className="duration">
                            duration

                        </div>
                    </div>
                </Col>
                <br />
                <Meta>

                </Meta>
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
