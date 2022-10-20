import React, { useContext, useState } from "react";
import { Button, Form,message, Input } from "antd";
import { login } from "../utils/urls";
import { Context } from "../contexts/UserContext";
import { usePostRequest } from "../hooks/request";


const Login = () => {
    const [signIn, setSignIn]=useState({})
    const { setUser} = useContext(Context)
   const postRequest = usePostRequest({url: login})

   const {loading: btnLoading} =postRequest
   console.log(btnLoading, 'btn');

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    console.log(errorInfo);
  };

   const loginHandler =async(values)=>{
     
        const {response} = await postRequest.request({data:{username: values.username, pwd: values.password} })
        
        if (
          (response.code === 404 && response.error === "AUTH_FAILED_ADMIN_NOT_FOUND") ||
          (response.code === 400 && response.error === "AUTH_FAILED_WRONG_PASSWORD")
        ) {
          message.warning("Login yoki parol xato")
          setUser(false);
        }else{
           setSignIn(response)
           setUser(true)
           localStorage.setItem("accessToken", response.data.tokens.accessToken);
           localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
           localStorage.setItem("id", response.data.id);
           localStorage.setItem("user", true);
         }
      
  
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
            { min: 4, message: 'Username must be minimum 5 characters.' },
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
            { min: 3, message: 'Username must be minimum 5 characters.' },

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
          <Button type="primary" htmlType="submit" loading={btnLoading }>
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

