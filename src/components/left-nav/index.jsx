import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';
import logo from '../../assets/images/logo192.png';
import './index.less';

// 引入子菜单组件
const { SubMenu } = Menu;

const LeftNav = () => {
  const [menuNodes, setMenuNodes] = useState([]);
  const [openKey, setOpenKey] = useState('');
  // 得到当前请求的路由路径
  const location = useLocation();

  /*
  根据menu的数据数组生成对应的标签数组
  使用map() + 递归调用
  */
  const getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.subMenuList) {
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
            {getMenuNodes(item.subMenuList)}
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
    // 得到当前请求的路由路径
    const path = location.pathname;
    return menuList.reduce((pre, item) => {
      // 向pre添加<Menu.Item>
      if (!item.subMenuList) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const itemWithSubMenu = item.subMenuList.find(
          // (itemWithSubMenu) => path.indexOf(itemWithSubMenu.key) === 0
          ({ key }) => key === path
        );
        // 如果存在, 说明当前item的子列表需要打开
        if (itemWithSubMenu) {
          setOpenKey(item.key);
        }
        // 向pre添加<SubMenu>
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <span>{item.title}</span>
              </span>
            }>
            {getMenuNodes(item.subMenuList)}
          </SubMenu>
        );
      }

      return pre;
    }, []);
  };

  useState(() => {
    const nodes = getMenuNodes(menuList);
    setMenuNodes(nodes);
  }, []);

  let path = location.pathname;
  // if (path.indexOf('/product') === 0) {
  //   path = '/product';
  // }

  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>React CMS</h1>
      </Link>

      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
        defaultOpenKeys={[openKey]}>
        {menuNodes}
      </Menu>
    </div>
  );
};

export default LeftNav;
