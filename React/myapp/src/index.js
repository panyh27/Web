import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import "antd/dist/antd.css";
import { Layout, DatePicker, version } from "antd";
import './index.css';
const { Header, Sider, Footer, Content } = Layout
const classes = {
  header: {
    height: '100'
  }
}
function Index() {
  const [data, setData] = useState("");
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/',
      withCredentials: true
    })
      .then((response) => {
        var data = JSON.stringify(response.data);
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      })

    axios('MachineLearning.md')
      .then((response) => setMarkdown(response.data))
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (

    <Layout>
      <Header className='header'>Header</Header>
      <Layout className='body'>
        <Sider>Sider</Sider>
        <Content className='content'>
          <ReactMarkdown className='markdown'>
            {markdown}
          </ReactMarkdown>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>

    /* <h1>{data}</h1>

    <DatePicker />
     */

  );
}
ReactDOM.render(<Index />, document.getElementById('root'));

