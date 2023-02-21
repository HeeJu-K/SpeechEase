import React, { useState } from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const fileTypes = ["JPG", "PNG", "GIF"];

root.render(

  <React.StrictMode>
    <App />
    {/* <FileUploader handleChange={handleChange} name="file" types={fileTypes} /> */}
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// const HomePage = props => {
//   const [file, setFile] = useState(null);
//   const handleChange = (file) => {
//     setFile(file);
//   };
//   return (
//     <div className="App">
//       <h1>Hello To Drag & Drop Files</h1>
//       <FileUploader
//         multiple={true}
//         handleChange={handleChange}
//         name="file"
//         types={fileTypes}
//       />
//       <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
//     </div>
//   );
// }
// export default HomePage;