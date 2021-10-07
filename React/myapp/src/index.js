import React, { createElement } from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import './index.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Header, Sider, Footer, Content } = Layout


const { SubMenu } = Menu

function createElementWithJson(data) {
  let list = []
  data.forEach((item, index) => {
    if (item.type) {
      list.push(
        <SubMenu key={index} title={item.name}>
          {createElementWithJson(item.children)}
        </SubMenu>
      )
    } else {
      list.push(
        <Menu.Item key={index}><Link to={item.name}>{item.name}</Link></Menu.Item>
      )
    }
  })
  return list
}

function Index() {
  const [data, setData] = useState([]);
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/',
      withCredentials: true
    })
      .then((response) => {
        setData(response.data);
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
      <Header className='header'>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['blog']}>
          <Menu.Item key="blog">博客</Menu.Item>
          <Menu.Item key="photo">照片</Menu.Item>
        </Menu>
      </Header>
      <Layout className='body'>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {createElementWithJson(data)}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 0 0 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="content">
            <ReactMarkdown>
              {markdown}
            </ReactMarkdown>
          </Content>
        </Layout>
      </Layout>
      <Footer className="footer">Footer</Footer>
    </Layout>
  );
}
ReactDOM.render(<Router><Index /></Router>, document.getElementById('root'));

