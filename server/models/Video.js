const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const videoSchema = mongoose.Schema({
    //type: User타입의 모든 정보
    //ref: 불러올 곳  (참조할곳은 현재 User)
    writer: {
        type: mongoose.Schema.ObjectId
        , ref: "User"
    },
    title: {
        type: String
        , maxlength: 40
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number
        , default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }

}, { timestamps: true });

//timestamps : 만든일과 수정일이 표시가되는 속성


//비디오 스키마를 비디오 모델로 만들겠다는 의미
const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }