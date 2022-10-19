import React, { useState, useEffect } from "react";
import { usePatchRequest, usePostRequest } from "../hooks/request";
import { Button, Drawer, Form, Input } from "antd";
import ImageUpload from "./ImageUpload";
import { teamList } from "../utils/urls";

const TeamDrawer = ({
    open,
    setOpen,
    getTeams,
    editing,
    setEditing,
    select,
    setSelect,
    loading
  }) => {
    const id = select?.id
    const postRequest = usePostRequest({ url: teamList });
    const editRequest =usePatchRequest({url: `${teamList}/${id}`})
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
  
    const postTeamHandler = async (values) => {
      const { response } = await postRequest.request({
        data: { ...values }
      });
      form.setFieldsValue(response.data);
      getTeams.request();
      setOpen(false);
      form.resetFields();
    };
  
    const editTeamHandler=async(values)=>{
      const {response}=await editRequest.request({
          data: {...values}
      })
      form.setFieldsValue(response.data)
      getTeams.request()
      setOpen(false)
      setEditing(false)
      form.resetFields();
    }
  
    const onSubmit=(values)=>{
      editing ? editTeamHandler(values) : postTeamHandler(values)
    }
  
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    const onClose = () => {
      setOpen(false);
      form.resetFields();
      setFileList([]);
      setSelect(null);
      setEditing(false)
    };
  
    useEffect(() => {
      if (select) {
        form.setFieldsValue(select);
      }
    }, [select]);
  return (
    <Drawer
    title={"Fill out the form"}
    placement="right"
    onClose={onClose}
    open={open}
    width={"70%"}
  >
    <Form
      form={form}
      name="control-hooks"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name={"name"}
        rules={[
          {
            required: true,
            message: "Please input name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Job"
        name={"job"}
        rules={[
          {
            required: true,
            message: "Please input job!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="image"
        name={"image"}
        rules={[
          {
            required: true,
            message: "Please input image!",
          },
        ]}
      >
        <ImageUpload
          fileList={fileList}
          setFileList={setFileList}
          form={form}
        />
      </Form.Item>
      <Form.Item
        label="Description"
        name={"description"}
        rules={[
          {
            required: true,
            message: "Please input description!",
          },
        ]}
      >
        <Input />
      </Form.Item>
     
      <Button type="primary" htmlType="submit" loading={loading} >
        Submit
      </Button>
    </Form>
  </Drawer>
);
  
}

export default TeamDrawer