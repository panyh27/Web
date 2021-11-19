import React from 'react';
import "antd/dist/antd.css";
import { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from "antd";
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import './blog.css'
import {
  useRouteMatch, useParams, useLocation, BrowserRouter as Router,
  Link
} from "react-router-dom";

const { Header, Sider, Footer, Content } = Layout;
const { SubMenu } = Menu

function createElementWithJson(url, data) {
  let list = []
  data.forEach((item, index) => {
    if (item.type) {
      list.push(
        <SubMenu key={index} title={item.name}>
          {createElementWithJson(url, item.children)}
        </SubMenu>
      )
    } else {
      list.push(
        <Menu.Item key={index}><Link to={url + '?filePath=' + item.path}>{item.name}</Link></Menu.Item>
      )
    }
  })
  return list
}

function MarkDown(name) {
  return (
    <div>
      {name ? (
        <h3>
          The <code>name</code> in the query string is {name}
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}

function Blog() {
  const [asideList, setAsideList] = useState([])
  const { pathname, search } = useLocation();
  let { url, params } = useRouteMatch();
  let { id } = useParams();
  const file = new URLSearchParams(search)
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/blog`,
      withCredentials: true,

    })
      .then((response) => {
        setAsideList(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);



  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {createElementWithJson(url, asideList)}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 0 0 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="content">
          <h1>fuck{pathname}</h1>
        </Content>
        <Child fileName={file.get('filePath')}></Child>
      </Layout>
    </Layout>
  );
}

function Child(props) {
  let fileName = props.fileName ? props.fileName : 'aa.txt'
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/files?filePath=` + fileName,
      withCredentials: true,

    })
      .then((response) => setMarkdown(response.data))
      .catch((error) => {
        console.log(error);
      })
  }, [fileName]);
  return (
    <div  className='body'>
      <h3>ID: {props.fileName}</h3>
      <ReactMarkdown>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
export default Blog