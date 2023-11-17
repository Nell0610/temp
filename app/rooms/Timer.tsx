import React from 'react';

export default function Timer(props: any){
    const timeLength = 25* 60;
    const [time,setTime] = React.useState(timeLength);

    React.useEffect(()=>{
        // if(time <= 0) return;

        // const interval = setInterval(()=>{
        //     setTime(time => time - 1);
        // }, 1000);
        // return () => clearInterval(interval);
        let interval: any;
        if(time > 0 && props.active){
            interval = setInterval(()=>{
                setTime(seconds=>seconds-1)
            }, 1000)
        }else if(!props.active && interval){
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [time, props.active]);
    let minutes = 0;
    let seconds = 0;
    
    const format = (time: any) => {
        minutes = Math.floor(time/60);
        seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    };

    return(
        <div>
            Time: {format(time)}
            </div>
    )
}