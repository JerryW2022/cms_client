import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.less';
import logo from '../../assets/images/logo192.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

export default function Login() {

  const navigate = useNavigate();

  // 如果用户已经登陆, 自动跳转到管理界面
  const user = memoryUtils.user;

  React.useEffect(() => {
    if (user && user._id) {
      navigate('/', { replace: false });
    }
  }, [navigate, user]);
  

  // Trigger after submitting the form and verifying data successfully
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    // Verify username and password here
    const { username, password } = values;
    // alert('Login successful!');

    /* reqLogin(username, password)
        .then((reponse) => {
          console.log('Successful', reponse.data);
        })
        .catch((error) => {
          console.log('Error', error);
        }); */

    //用async await简化promise的使用
    const response = await reqLogin(username, password);
    // console.log('request successful', response);
    const result = response; //{status:0,data: user} {status:1,msg:''}
    if (result.status === 0) {
      //login success
      message.success('Login Success');

      //save user
      const user = result.data;
      memoryUtils.user = user; //保存在内存中
      storageUtils.saveUser(user); //保存到local中

      //跳转到后台管理界面
      navigate('/', { replace: false });
    } else {
      //login fail
      message.error(result.msg);
    }
  };
  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject('Password is required');
    } else if (value.length < 4 || value.length > 10) {
      return Promise.reject(
        'Password must be between 4 and 10 characters long.'
      );
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject(
        'Password can contain any letters from a to z , any numbers from 0 through 9 and _ (underscore).'
      );
    }
    return Promise.resolve();
  };
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React Content Management System</h1>
      </header>
      <section className="login-content">
        <h2>LOGIN</h2>
        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off">
            {/* 用户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于等于 4 位
            3).必须小于等于 12 位
            4). 必须是英文、数字或下划线组成 */}

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input your Username!',
                },
                {
                  min: 4,
                  message: 'Must be between 4 and 10 characters long.',
                },
                {
                  max: 10,
                  message: 'Must be between 4 and 10 characters long.',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message:
                    'Can contain any letters from a to z , any numbers from 0 through 9 and _ (underscore).',
                },
              ]}
              initialValue="admin">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ validator: validatePassword }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
}

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */

/*
1. 前台表单验证
2. 收集表单输入数据
 */

/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */
