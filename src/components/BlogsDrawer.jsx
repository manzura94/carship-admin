import React, { useState, useEffect } from "react";
import { usePatchRequest, usePostRequest } from "../hooks/request";
import { Button, Drawer, Form, Input } from "antd";
import ImageUpload from "./ImageUpload";
import { blogList } from "../utils/urls";

const BlogsDrawer = ({
  open,
  setOpen,
  getBlogs,
  editing,
  setEditing,
  select,
  setSelect,
  loading,
}) => {
  const id = select?.id;
  const postRequest = usePostRequest({ url: blogList });
  const editRequest = usePatchRequest({ url: `${blogList}/${id}` });
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const postBlogHandler = async (values) => {
    const { response } = await postRequest.request({
      data: { ...values },
    });
    form.setFieldsValue(response.data);
    getBlogs.request();
    setOpen(false);
    form.resetFields();
  };

  const editPostHandler = async (values) => {
    const { response } = await editRequest.request({
      data: { ...values },
    });
    form.setFieldsValue(response.data);
    getBlogs.request();
    setOpen(false);
    setEditing(false);
    form.resetFields();
  };

  const onSubmit = (values) => {
    editing ? editPostHandler(values) : postBlogHandler(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
    setSelect(null);
    setEditing(false);
  };
  console.log(select);

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
        <div className="form-items">
          <Form.Item
            label="title"
            name={"title"}
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="subtitle"
            name={"sub_title"}
            rules={[
              {
                required: true,
                message: "Please input subtitle!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="form-items">
          <Form.Item
            label="intro"
            name={"intro"}
            rules={[
              {
                required: true,
                message: "Please input intro!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="content"
            name={"content"}
            rules={[
              {
                required: true,
                message: "Please input content!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="form-items">
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
          label="date"
          name={"date"}
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </Drawer>
  );
};

export default BlogsDrawer;
