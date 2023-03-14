import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Raspberry from './components/Raspberry.js';
import './App.css';
import styles from './styles.less';

function App() {

  // const fileTypes = ["TXT", "DOC"];
  // const [file, setFile] = useState(null);
  // const [fileContent, setFileContent] = useState(null);
  // const [keywords, setKeywords] = useState(["not avaiable", 0]);
  // const [displayKeywords, setDisplayKeywords] = useState(["not avaiable", 0])
  // const [numKeywords, setNumKeywords] = useState(20);
  // const [addString, setAddString] = useState("");

  // const handleChange = (fileList) => {
  //   setFile(fileList[0]);
  // };


  // const onChangeSlider = (value) => {
  //   setNumKeywords(value)
  //   console.log("num keywords", value)
  //   console.log("new keywords: ", keywords, keywords.slice(0, value))
  //   setDisplayKeywords(keywords.slice(0, value))
  // }

  // const handleKwInput = (e) => {
  //   // console.log("add keyword", e.target.value)
  //   setAddString(e.target.value)
  // }
  // const handleAddKw = (e) => {
  //   let index = Object.keys(displayKeywords).length
  //   let tmp = [
  //     ...[[addString, 0.01]],
  //     ...displayKeywords,
  //     // ...displayKeywords.slice(index)
  //   ]
  //   setDisplayKeywords(tmp)
  // }

  // const handleErase = (e) => {
  //   console.log("erase e", e.target.id, typeof (e.target.id))
  //   let index = parseInt(e.target.id)
  //   // let erasetmp = displayKeywords.splice(e.target.id,1)
  //   let disp_tmp1 = keywords.slice(0, index)
  //   let disp_tmp2 = keywords.slice(index + 1, numKeywords)
  //   let disp_tmp = disp_tmp1.concat(disp_tmp2)
  //   setDisplayKeywords(disp_tmp)

  //   let full_tmp1 = keywords.slice(0, index)
  //   let full_tmp2 = keywords.slice(index + 1)
  //   let full_tmp = full_tmp1.concat(full_tmp2)
  //   setKeywords(full_tmp)
  //   // console.log("fullkeywords", keywords.slice(e.target.id+1, Object.keys(displayKeywords).length))
  //   // let eraseKw = [
  //   //   keywords.slice(0, e.target.id).concat(keywords.slice(e.target.id+1))
  //   // ]
  //   // console.log("fullkeywords", keywords.slice(0, e.target.id), keywords.slice(e.target.id+1))
  //   // let eraseDkw = [
  //   //   ...displayKeywords.slice(0, e.target.id),
  //   //   ...displayKeywords.slice(e.target.id+1, numKeywords),
  //   // ]
  //   // console.log("fullkw", eraseKw, "display Kw", eraseDkw)
  //   setNumKeywords(numKeywords - 1)
  //   // setDisplayKeywords(eraseDkw)
  //   // setKeywords(eraseKw)
  // }
  // // const onChangeSlider = (value) => {
  // //   setNumKeywords(value)
  // //   var data = new FormData();
  // //   data.append('numKeywords', value);

  // //   axios.post(
  // //     'http://127.0.0.1:5000/keywords', data
  // //   )
  // //     .then(
  // //       (response) => {
  // //       console.log(JSON.stringify(response.data));
  // //       setKeywords(response.data);

  // //     })
  // //     .catch(function (error) {
  // //       console.log(error);
  // //     });
  // // }
  // //re-route
  // let history = useHistory();
  // const handleSend = () => {
  //   history.push('/keywords');
  // }


  return (
    // <div className="App">
    //   <h1>Hello To Drag & Drop Files</h1>
    //   <FileUploader
    //     multiple={true}
    //     handleChange={handleChange}
    //     name="file"
    //     types={fileTypes}
    //   />
    //   <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
    //   <p>{fileContent}</p>
    //   <button onClick={onFileUpload}>Extract Keywords</button>
    //   {/* <p>{keywords}</p><p>{typeof(keywords)}</p> */}
    //   <div className={styles.KeywordsBox} style={{ marginTop: "20px", border: "0.75px solid ", alignContent: "center" }}>
    //     {
    //       displayKeywords.map((keyword, index) => {
    //         return (
    //           <div >
    //             <button id={index} onClick={handleErase}>{keyword[0]} X </button>
    //             {/* <div >{keyword[0]}</div>
    //             <button >X</button> */}
    //           </div>
    //         )
    //       }
    //       )
    //     }
    //   </div>
    //   <input placeholder='add keywords here' onChange={handleKwInput}></input>
    //   <button onClick={handleAddKw}>Add</button>
    //   <Slider defaultValue={30} onChange={onChangeSlider} />
    //   <p>{numKeywords > 50 ? 50 : numKeywords}</p>
    //   <button onClick={handleSend}>Send</button>
    // </div >
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Raspberry" element={<Raspberry />} />
        </Routes>
      </BrowserRouter>


      {/* //   <header className="App-header">
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
    //   </header> */}
    </div>
  );
}

export default App;
