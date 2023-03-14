import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';

import { Slider, Switch } from 'antd';
import './styles.less';

// import yake;


function Home() {

  const fileTypes = ["TXT", "DOC"];
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [keywords, setKeywords] = useState(["", 0]);
  const [displayKeywords, setDisplayKeywords] = useState(["", 0])
  const [numKeywords, setNumKeywords] = useState(20);
  const [addString, setAddString] = useState("");
  const [tabIdx, setTabIdx] = useState(0)

  const onTabSelect = (index) => {
    setTabIdx(index)
    console.log("tabindex in select", tabIdx)
  }

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
    formData.append(
      "tabIndex",
      tabIdx
    )
    console.log("tabindex", tabIdx)
    axios.post(
      "http://127.0.0.1:5000/extract", formData
      // "http://164.92.178.243:5000/extract", formData
    ).then(
      (response) => {
        console.log("response keywords: ", response.data);

        setKeywords(response.data);
        setDisplayKeywords(keywords.slice(0, 20))
        console.log("see displaykeword type", typeof displayKeywords)
      }
    )
      .catch(
        (error) => console.log(error)
      );
  };
  const convertKeywords = (keywords) => {
    let tmp = [[]]
    // console.log("in convert: ", keywords[1][0])
    keywords.map((keyword) => {
      tmp.push([
        keyword[0],
        true,
        "volume",
        "first",
        "second",
      ])
    })
    console.log("in convert tmp", tmp)
    let object_tmp = {
      "selectedKeywords": tmp
    }
    return object_tmp
  }
  const onSendKeyword = () => {
    let finalKeywords = convertKeywords(displayKeywords)
    console.log("converted keywords: ", finalKeywords)
    axios.post(
      "http://127.0.0.1:5000/keywords", finalKeywords
      // "http://164.92.178.243:5000/keywords", finalKeywords
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
    setAddString(e.target.value)
  }
  const handleAddKw = (e) => {
    let index = Object.keys(displayKeywords).length
    let tmp = [
      ...[[addString]],
      ...displayKeywords,
      // ...displayKeywords.slice(index)
    ]
    setDisplayKeywords(tmp)
  }

  const handleEraseElem = (e) => {
    console.log("erase elem e", e.target.id, e)
    let colIdx = parseInt(e.target.id[0])
    let rowIdx = parseInt(e.target.id.substring(2))
    console.log("erase elem e content", displayKeywords, rowIdx, colIdx)

    console.log("erase e elem row keywords", keywords, keywords[rowIdx])
    let row_tmp1 = keywords[rowIdx].slice(0, colIdx) //the front part
    let row_tmp2 = keywords[rowIdx].slice(colIdx + 1) //the last part
    let row_tmp = row_tmp1.concat(row_tmp2)
    console.log("erase e elem row_tmp", row_tmp)
    let full_tmp1 = keywords.slice(0, rowIdx)
    let full_tmp2 = full_tmp1.concat([row_tmp])
    let full_tmp3 = keywords.slice(rowIdx + 1)
    let full_tmp = full_tmp2.concat(full_tmp3)
    console.log("erase e elem full_tmp", full_tmp, typeof full_tmp, full_tmp.slice(0, numKeywords))
    setKeywords(full_tmp)
    setDisplayKeywords(full_tmp.slice(0, numKeywords))
    // // let erasetmp = displayKeywords.splice(e.target.id,1)
    // let disp_tmp1 = keywords.slice(0, index)
    // let disp_tmp2 = keywords.slice(index + 1, numKeywords)
    // let disp_tmp = disp_tmp1.concat(disp_tmp2)
    // setDisplayKeywords(disp_tmp)

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
  }
  const handleEraseRow = (e) => {
    console.log("erase e", e.target.id, typeof (e.target.id))
    let rowIdx = parseInt(e.target.id - 1)
    console.log("erase row e content", displayKeywords, rowIdx)

    // let full_tmp1 = keywords.slice(0, index)
    // let full_tmp2 = keywords.slice(index + 1)
    // let full_tmp = full_tmp1.concat(full_tmp2)
    // setKeywords(full_tmp)

    // let index = parseInt(e.target.id)
    // // let erasetmp = displayKeywords.splice(e.target.id,1)
    // let disp_tmp1 = keywords.slice(0, index)
    // let disp_tmp2 = keywords.slice(index + 1, numKeywords)
    // let disp_tmp = disp_tmp1.concat(disp_tmp2)
    // setDisplayKeywords(disp_tmp)

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
    // navigate('/Raspberry');
    onSendKeyword()
  }

  return (
    <div className="main">
      {/* <Tabs defaultIndex={0} onSelect={(index) => onTabSelect(index)}
        style={{ marginTop: "3rem", fontSize: "1rem" }}
      >
        <TabList>
          <Tab>Upload Script</Tab>
          <Tab>Upload Keywords</Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs> */}
      <div  >
        <div className="upload">Drag & Drop Your Script</div>
        <div style={{ alignItems: "center", marginLeft:"31%" }}>
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          <div style={{ marginLeft:"175px"}}>{file ? `File name: ${file.name}` : "no files uploaded yet"}</div>
          <div style={{ textAlign: "center"}}>{fileContent}</div>
        </div>
        <button style={{alignItems:"center"}} onClick={onFileUpload}>Extract Keywords</button>

        {/* <p>{keywords}</p><p>{typeof(keywords)}</p> */}
        <div className="KeywordsBox" style={{ marginTop: "20px", border: "0.75px solid ", alignContent: "center" }}>
          {
            displayKeywords.map((keyword, index) => (
              <div key={keyword.toString()} style={{ padding: "0.1rem" }}>
                {
                  Object.keys(keyword).map((idx) => (
                    <>
                      {keyword[idx] != "" &&
                        <>
                          {keyword[idx]}<button id={[idx, index]} onClick={handleEraseElem}>  X </button>
                        </>
                      }
                    </>
                  ))
                }
                {keyword != "" &&
                  <button id={index} onClick={handleEraseRow} style={{ float: "right" }} > X </button>
                }
              </div>
            ))
          }
        </div>
        <input placeholder='add keywords here' onChange={handleKwInput}></input>
        <button onClick={handleAddKw}>Add</button>
        <Slider defaultValue={30} onChange={onChangeSlider} />
        <p>{numKeywords > 50 ? 50 : numKeywords}</p>
        <button onClick={handleSend}>Send</button>
      </div>
    </div >
  );
}

export default Home;
