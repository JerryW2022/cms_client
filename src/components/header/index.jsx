import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import { reqWeather } from '../../api';
import menuList from '../../config/menuConfig';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import LinkButton from '../link-button';
import './index.less';

export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const location = useLocation();
  const getTitle = () => {
    // 得到当前请求路径
    const path = location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title;
      } else if (item.subMenuList) {
        // 在所有子item中查找匹配的
        const cItem = item.subMenuList.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        // 如果有值才说明有匹配的
        if (cItem) {
          // 取出它的title
          title = cItem.title;
        }
      }
    });
    return title;
  };

  const logout = () => {
    const { confirm } = Modal;
    confirm({
      title: 'Do you want to log out?',
      onOk() {
        // console.log('OK');
        // 删除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {};
        // 跳转到login
        navigate('/login');
      },
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formateDate());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useState(() => {
    const getWeather = async () => {
      // 调用接口请求异步获取数据
      const { icon, description } = await reqWeather('Sydney');
      // 更新状态
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
      setIconUrl(iconUrl);
      setDescription(description);
    };
    getWeather();
  });

  const username = memoryUtils.user.username;
  const title = getTitle();

  return (
    <div className="header">
      <div className="header-top">
        <span>{username}</span>
        {/* <Button onClick={logout}>Log Out</Button> */}
        <LinkButton onClick={logout}>
          Log Out
        </LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <img src={iconUrl} alt="icon" />
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}
