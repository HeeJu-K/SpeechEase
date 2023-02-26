import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';

import { Slider, Switch } from 'antd';
import styles from './styles.less';

// import yake;


function Home() {

  const fileTypes = ["TXT", "DOC"];
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [keywords, setKeywords] = useState(["not avaiable", 0]);
  const [displayKeywords, setDisplayKeywords] = useState(["not avaiable", 0])
  const [numKeywords, setNumKeywords] = useState(20);
  const [addString, setAddString] = useState("");

  const handleChange = (fileList) => {
    setFile(fileList[0]);
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    console.log("file:");
    console.log(file);
    // Update the formData object
    formData.append(
      "textfile",
      file,
      // file.name
    );
    axios.post(
      // "http://127.0.0.1:5000/extract", formData
      "http://164.92.178.243:5000/extract", formData
    ).then(
      (response) => {
        console.log(response);
        setKeywords(response.data);
        setDisplayKeywords(keywords.slice(0, 20))
      }
    )
      .catch(
        (error) => console.log(error)
      );
  };
  console.log("keywords: ", displayKeywords)
  const convertKeywords = (keywords) => {
    let tmp = { 
        "selectedKeywords": keywords
    }
    return tmp
  }
  const onSendKeyword = () => {
    let finalKeywords = convertKeywords(displayKeywords)
    console.log("converted keywords: ", finalKeywords)
    axios.post(
        // "http://127.0.0.1:5000/keywords", finalKeywords
        "http://164.92.178.243:5000/keywords", finalKeywords
      ).then(
        (response) => {
          console.log("send", response);
        }
      )
        .catch(
          (error) => console.log(error)
        );
  };

  const onChangeSlider = (value) => {
    setNumKeywords(value)
    console.log("num keywords", value)
    console.log("new keywords: ", keywords, keywords.slice(0, value))
    setDisplayKeywords(keywords.slice(0, value))
  }

  const handleKwInput = (e) => {
    // console.log("add keyword", e.target.value)
    setAddString(e.target.value)
  }
  const handleAddKw = (e) => {
    let index = Object.keys(displayKeywords).length
    let tmp = [
      ...[[addString, 0.01]],
      ...displayKeywords,
      // ...displayKeywords.slice(index)
    ]
    setDisplayKeywords(tmp)
  }

  const handleErase = (e) => {
    console.log("erase e", e.target.id, typeof (e.target.id))
    let index = parseInt(e.target.id)
    // let erasetmp = displayKeywords.splice(e.target.id,1)
    let disp_tmp1 = keywords.slice(0, index)
    let disp_tmp2 = keywords.slice(index + 1, numKeywords)
    let disp_tmp = disp_tmp1.concat(disp_tmp2)
    setDisplayKeywords(disp_tmp)

    let full_tmp1 = keywords.slice(0, index)
    let full_tmp2 = keywords.slice(index + 1)
    let full_tmp = full_tmp1.concat(full_tmp2)
    setKeywords(full_tmp)
    // console.log("fullkeywords", keywords.slice(e.target.id+1, Object.keys(displayKeywords).length))
    // let eraseKw = [
    //   keywords.slice(0, e.target.id).concat(keywords.slice(e.target.id+1))
    // ]
    // console.log("fullkeywords", keywords.slice(0, e.target.id), keywords.slice(e.target.id+1))
    // let eraseDkw = [
    //   ...displayKeywords.slice(0, e.target.id),
    //   ...displayKeywords.slice(e.target.id+1, numKeywords),
    // ]
    // console.log("fullkw", eraseKw, "display Kw", eraseDkw)
    setNumKeywords(numKeywords - 1)
    
  }

  //re-route
  let navigate = useNavigate();
  const handleSend = () => {
    navigate('/Raspberry');
    onSendKeyword()
  }


  return (
    <div className="Home">
      <h1>Drag & Drop Your Script</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      <p>{fileContent}</p>
      <button onClick={onFileUpload}>Extract Keywords</button>
      {/* <p>{keywords}</p><p>{typeof(keywords)}</p> */}
      <div className={styles.KeywordsBox} style={{ marginTop: "20px", border: "0.75px solid ", alignContent: "center" }}>
        {
          displayKeywords.map((keyword, index) => {
            return (
              <div >
                <button id={index} onClick={handleErase}>{keyword[0]} X </button>
                {/* <div >{keyword[0]}</div>
                <button >X</button> */}
              </div>
            )
          }
          )
        }
      </div>
      <input placeholder='add keywords here' onChange={handleKwInput}></input>
      <button onClick={handleAddKw}>Add</button>
      <Slider defaultValue={30} onChange={onChangeSlider} />
      <p>{numKeywords > 50 ? 50 : numKeywords}</p>
      <button onClick={handleSend}>Send</button>
    </div >
    //  <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div> 
  );
}

export default Home;
