import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Subscriber({ userTo, userFrom }) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = () => {

        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }

        if (Subscribed) {
            //when we are already subscribed 
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if (response.data.success) {

                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not subscribed yet
            console.log("구독안함 -> 구독으로 ");
            axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {

                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }


    useEffect(() => {


        const subscribeNumberVariables = {
            userTo: userTo, userFrom: userFrom
        };


        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            });


        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {

                if (response.data.success) {
                    console.log("result 정보 : ", response.data.result);
                    setSubscribed(response.data.result);
                } else {
                    alert('Failed to get Subscribed Information')
                }
            });
    }, [])


    return (

        <div>
            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscriber
