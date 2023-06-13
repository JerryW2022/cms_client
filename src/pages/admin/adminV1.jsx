import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";

import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home/home";
import Product from "../product/product";
import Category from "../category/category";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Order from "../order/order";

const { Content, Footer, Sider } = Layout;

export default function Admin() {
  const { user } = memoryUtils;
  // 如果内存没有存储user ==> 当前没有登陆
  if (!user || !user._id) {
    // 自动跳转到登陆(在render()中)
    return (
      <Routes>
        {/* Navigate用于重定向，对路径path="/"渲染to="/About" 页面 */}
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header>header</Header>
        <Content style={{ margin: 20, backgroundColor: "white" }}>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="role" element={<Role />} />
            <Route path="user" element={<User />} />
            <Route path="charts">
              <Route path="bar" element={<Bar />} />
              <Route path="line" element={<Line />} />
              <Route path="pie" element={<Pie />} />
            </Route>
            <Route path="order" element={<Order />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center", color: "#cccccc" }}>
          footer
        </Footer>
      </Layout>
    </Layout>
  );
}
