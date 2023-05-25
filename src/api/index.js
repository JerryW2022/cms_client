/* 
要求：能根据接口文档定义接口请求
包含应用中所有请求的模块
每个函数的返回值都是promise
*/

import ajax from './ajax';
import jsonp from 'jsonp';

// const BASE = 'http://localhost:5001';
const BASE = '';

//登录
/* export function reqLogin(username,password) {
  return ajax('/login',{username,password},'POST')
} */
export const reqLogin = (username, password) =>
  ajax(BASE + '/login', { username, password }, 'POST');
//添加用户
export const reqAddUser = (user) =>
  ajax(BASE + '/manage/user/add', user, 'POST');


// 获取一级/二级分类的列表
export const reqCategories = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类

// 获取商品分页列表
// 更新商品的状态(上架/下架)



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */


// 搜索商品分页列表 (根据商品描述)


// 删除指定名称的图片

// 添加/修改商品
// 修改商品


// 获取所有角色的列表
// 添加角色
// 添加角色


// 获取所有用户的列表
// 删除指定用户
// 添加/更新用户


/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {
  return new Promise((resolve, rej) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=280e4395527ab94ff4b8f09ac5bd1aad&units=metric`;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // console.log('jsonp', err, data);
      //如果成功了
      if (!err && data.cod === 200) {
        const { description, icon } = data.weather[0];
        resolve({ description, icon });
        // console.log(data.weather[0]);
      } else {
        //如果失败了
        console.log(data.cod);
      }
    });
  });
};
// reqWeather('Sydney');
