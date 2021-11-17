import React from 'react';
import "antd/dist/antd.css";
import { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from "antd";
import axios from 'axios';
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

const { Header, Sider, Footer, Content } = Layout;
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
        <Menu.Item key={index}><Link to={"item.name"}>{item.name}</Link></Menu.Item>
      )
    }
  })
  return list
}
function Blog() {
  const [asideList, setAsideList] = useState([])
  const location = useLocation();
  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080${location.pathname}`,
      withCredentials: true,
  
    })
      .then((response) => {
        setAsideList(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [location.pathname]);
  return (
    <Layout className='body'>
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {createElementWithJson(asideList)}
      </Menu>
    </Sider>
    <Layout style={{ padding: '0 0 0 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="content">
        <h1>fuck{useLocation().pathname}</h1>
        <Switch>
          <Route path="/blog" >
          </Route>
        </Switch>

      </Content>
    </Layout>
  </Layout>
  );
}

export default Blog