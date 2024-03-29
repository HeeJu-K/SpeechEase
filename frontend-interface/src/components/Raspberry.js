import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_IP = "http://10.19.228.170:5000"
const RASP_IP = "http://10.19.0.61:5000"

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
            SERVER_IP + "/modify",
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
                SERVER_IP + "/keywords",
            )
                .then((res) => {
                    console.log("check res", res.data["selectedKeywords"])
                    setKeywords(res.data["selectedKeywords"])
                });
        }
        receiveKeywords();

        console.log("rasp see keywords", keywords)
        // keywords.shift()
        console.log("rasp see keywords after shift", keywords)
    }, [])
    // console.log("see keywords 00 ", keywords)
    // setKeywords(keywords.slice(1))
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
                            <div>{ keyword[1]===true?<div>{keyword[0]}</div>:<div></div>}</div>
                            
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
