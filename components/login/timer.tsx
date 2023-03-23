import React from 'react'
import { Text } from '@ui-kitten/components';
import { MotiView } from 'moti';
import { useState, useEffect } from 'react';

const Timer = (props:any) => {
    const {initialSeconds = 0, timeout} = props;
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
            timeout();
            clearInterval(myInterval)
        
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <>
        { seconds !== 0 && <Text status='info'> {seconds < 10 ?  `0${seconds} s` : `${seconds}s`}</Text> 
        }
        </>
    )
}

export default Timer;