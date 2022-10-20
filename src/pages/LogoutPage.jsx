import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {  Spin } from "antd";
import { authHost } from "../utils/https";
import {  logout } from "../utils/urls";
import { useEffect } from "react";
import { Context } from "../contexts/UserContext";
import { usePostRequest } from "../hooks/request";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);
  const postRequest = usePostRequest({url: logout})


  const changeUser = async () => {
     await postRequest.request();

    setUser(false);
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    changeUser();
  }, []);
  return (
    <div className="example">
      <Spin size="large" />
    </div>
  );
};

export default LogoutPage;