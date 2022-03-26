import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { useRequest } from 'ahooks'
import { isLogin } from '../utils/request'
import { useNavigate } from "react-router-dom";
import './login.css'

export default function Login() {
  const navigate = useNavigate();

  const { data, run } = useRequest((params)=>isLogin(params), {
    manual: true,
    onSuccess:({ code, msg, data: { 
      token = '', phone = '', province = '', city='', antd = '', isAuth
     } }) => {
      // return data
      if(code == 20000) {
        console.log(token, 'token')
        localStorage.setItem("token", token);
        localStorage.setItem("phone", phone);
        localStorage.setItem("province", province);
        localStorage.setItem("city", city);
        localStorage.setItem("antd", antd);
        localStorage.setItem("isAuth", isAuth);
        navigate("/index");
        message.success(msg)
      } else {
        message.error(msg)
      }
    }
  })

  const onFinish = (values: any) => {
    run(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card className="login" >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="phone"
          name="phone"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};