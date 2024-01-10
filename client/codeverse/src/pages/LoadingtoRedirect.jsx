import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
const LoadingtoRedirect = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5); // Start the count from 5 to count down

    useEffect(() => {
        // Countdown
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);

        // Redirect when count reaches 0
        if (count === 0) {
            navigate('/signin');
        }

        // Clear interval on component unmount or count reaches 0
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:'center'}} >
            <h1>You are being redirected in {count} seconds</h1> 
            <div style={{marginLeft:"20px"}} >
            <Loader/>
            </div>
        </div>
    );
};

export default LoadingtoRedirect;
