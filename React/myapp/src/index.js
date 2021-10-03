import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import './index.css';


function getData(fuck) {
  fuck = "hello"
  axios({
    method: 'get',
    url: 'http://localhost:8080/',
    withCredentials: true
  })
    .then(function (response) {
      var data = JSON.parse(response);
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    })
}

function Index() {
  const [data, setData] = useState("");
  const [markdown, setMarkdown] = useState('');
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios({
  //       method: 'get',
  //       url: 'http://localhost:8080/',
  //       withCredentials: true
  //     })
  //       .then(function (response) {
  //         var data = JSON.stringify(response.data);
  //         console.log(data);
  //         setData(data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    axios('MachineLearning.md')
      .then((response) => setMarkdown(response.data))
  }, []);

  return (
    <div>
      <h1>{data}</h1>
      <ReactMarkdown>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
ReactDOM.render(<Index />, document.getElementById('root'));

