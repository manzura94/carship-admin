import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { authHost } from "../utils/https";
import { login } from "../utils/urls";
import { Context } from "../contexts/UserContext";

const Login = () => {
    const [signIn, setSignIn]=useState({})
    const {setUser} = useContext(Context)
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

   const loginHandler =async(values)=>{
   const {data} = await authHost.post( login, {username: values.username, pwd: values.password} )
   console.log(data);
    setSignIn(data)
    setUser(true)
    localStorage.setItem("accessToken", data.data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("user", true);
  
   }
  return (
    <div className="login__form">
      <Form
        name="basic"
        className="login__form-container"
        initialValues={{
          remember: true,
        }}
        onFinish={loginHandler}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

//login: carship_admin
//pwd: carship_admin

