import { useRef, useEffect, useState } from 'react';

export default function QuizTimer( {timeout, onTimeout} ) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        return () => clearTimeout(timer);
    }, [timeout, onTimeout])
    
    useEffect(() => {
        const interval =setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
        }, 100)

        return () => clearInterval(interval);
    }, []) 
    
    return <progress value={remainingTime} max={timeout}/>
}
