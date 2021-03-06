const express = require('express');
const router = express.Router();


const { Subscriber } = require("../models/Subscriber");


//=================================
//             Subscribe
//=================================


router.post("/subscribeNumber", (req, res) => {
    Subscriber.find({
        userTo: req.body.userTo
    }).exec((err, subscribe) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            subscribeNumber: subscribe.length
            , subscribe: subscribe
        });
    });
});



router.post("/subscribed", (req, res) => {
    Subscriber.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec(
        (err, subscribe) => {

            if (err) return res.status(400).send(err);

            let result = false;
            //구독을 했으면 result = true;
            if (subscribe.length !== 0) {
                return res.status(200).json({
                    success: true
                    , result: true
                })
            }
            //구독을 안 했으면 result = false
            else {
                return res.status(200).json({
                    success: true
                    , result: result
                })

            }
        }
    );
});


router.post("/unSubscribe", (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom }).exec(
        (err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc });
        }
    );
});

router.post("/subscribe", (req, res) => {
    console.log("구독으로 변경");
    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});


module.exports = router;