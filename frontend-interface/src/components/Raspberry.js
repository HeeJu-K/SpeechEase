import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Raspberry() {

    let test_val = true
    let navigate = useNavigate();
    const [keywords, setKeywords] = useState([]);
    // let keywords = {}
    const handleHome = () => {
        navigate('/', { replace: true });
    }
    const handleRefresh = () => {
        axios.get(
            // "http://127.0.0.1:5000/modify", 
            "http://164.92.178.243:5000/modify",
        ).then(
            (res) => {
                console.log("refreshed keywords", res.data);
                setKeywords(res.data)
            }
        )
            .catch(
                (error) => console.log(error)
            );
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
                <h1 style={{marginBottom:"10px"}}>
                    for raspberry
                    {/* {keywords[0]} */}
                </h1>
                <div>
                    {keywords.map((keyword) => (
                        <div>
                            <div>{keyword[1]==true?<div>{keyword[0]}</div>:<div></div>}</div>
                            
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={handleRefresh}>Refresh</button>
                </div>
            </div>
            <div>
                <button onClick={handleHome}>Home</button>
            </div>
        </div>
    );
}

export default Raspberry;
