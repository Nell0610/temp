import React, {Component} from 'react';

export default function Timer(){
    const timeLength = 25* 60;
    const [time,setTime] = React.useState(timeLength);

    React.useEffect(()=>{
        if(time <= 0) return;

        const interval = setInterval(()=>{
            setTime(time => time - 1);
        }, 1000);
    }, [time]);
    let minutes = 0;
    let seconds = 0;
    function format(){
        minutes = Math.floor(time/60);
        seconds = time % 60;
    }
}