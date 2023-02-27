import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Raspberry() {
    let navigate = useNavigate();
    const [keywords, setKeywords] = useState([]);
    // let keywords = {}
    const handleHome = () => {
        navigate('/', { replace: true });
    }

    useEffect(() => {
        async function receiveKeywords() {
            await axios.get(
                // 'http://127.0.0.1:5000/keywords',
                'http://164.92.178.243:5000/keywords',
            )
                .then((res) => {
                    setKeywords(res.data["selectedKeywords"])
                });
        }
        receiveKeywords();
    }, [])

    console.log("see keywords", keywords)
    return (
        <div>
            <div>
                <div>
                    for raspberry
                    {/* {keywords[0]} */}
                </div>
                <div>
                    {keywords.map((item) => (
                        <div>{item[0]}</div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={handleHome}>Home</button>
            </div>
        </div>
    );
}

export default Raspberry;
