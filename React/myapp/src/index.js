import React, { createElement } from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import './index.css';
import { useHistory, useParams, useLocation } from "react-router-dom";
import Blog from './blog/blog.js';
const { Header, Sider, Footer, Content } = Layout


function Index() {
  const [inputValue, setInputValue] = useState('hello')
  const location = useLocation();

  const handleOnChange = (event) => {
    const value = event.target.value
    setInputValue(value)
    console.log(inputValue)
  }

  return (
    <Layout>
      <Header className='header'>
        <div className="logo" >
          <input value={inputValue} onChange={handleOnChange}>

          </input>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home" ><Link to="/">首页</Link></Menu.Item>
          <Menu.Item key="doc"><Link to="/blog">文档</Link></Menu.Item>
          <Menu.Item key="photo"><Link to="/photo">照片</Link></Menu.Item>
        </Menu>
      </Header>
      <Switch>
        <Route path="/blog" component={Blog} />
      </Switch>
      <Footer className="footer">Footer</Footer>
    </Layout>
  );
}
ReactDOM.render(<Router><Index /></Router>, document.getElementById('root'));

