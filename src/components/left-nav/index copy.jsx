import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';
// import {
//   DashboardOutlined,
//   ShoppingOutlined,
//   PlusCircleOutlined,
//   UserOutlined,
//   UsergroupAddOutlined,
//   BarChartOutlined,
//   LineChartOutlined,
//   PieChartOutlined,
//   AreaChartOutlined,
// } from '@ant-design/icons';
import logo from '../../assets/images/logo192.png';
import './index.less';

export default function LeftNav() {
  // 引入子菜单组件
  const SubMenu = Menu.SubMenu;

  // 得到当前请求的路由路径
  const path = useLocation();
  console.log('@', path.pathname);

  /*
  根据menu的数据数组生成对应的标签数组
  使用map() + 递归调用
  */
  const getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {/* <{item.icon} /> */}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                {/* {item.icon} */}
                <span>{item.title}</span>
              </span>
            }>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  /*
  根据menu的数据数组生成对应的标签数组
  使用reduce() + 递归调用
  */
  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      // 向pre添加<Menu.Item>
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {/* <{item.icon} /> */}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(
          (cItem) => cItem.key === path.pathname
        );
        if (cItem) {
          const openKey = item.key;
          console.log('openKey', openKey);
        }

        // 向pre添加<SubMenu>
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                {/* {item.icon} */}
                <span>{item.title}</span>
              </span>
            }>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  useEffect(() => {
    const menuNodes = getMenuNodes(menuList);
    // 这里执行 componentWillMount 的逻辑

  }, []); // 空数组作为第二个参数，只在组件挂载时执行一次

  menuNodes;
  // const openKey = ;

  return (
    <div>
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>React CMS</h1>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[path.pathname]}
        // defaultOpenKeys={[openKey]}
      >
        {menuNodes}
      </Menu>
    </div>
  );
}
