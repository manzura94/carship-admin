import React, { useState, useEffect } from "react";
import { usePatchRequest, usePostRequest } from "../hooks/request";
import { Button, Drawer, Form, Input, DatePicker } from "antd";
import ImageUpload from "./ImageUpload";
import { reviewList } from "../utils/urls";

const ReviewDrawer = ({
  open,
  setOpen,
  getReview,
  editing,
  setEditing,
  select,
  setSelect,
  loading,
}) => {
  const id = select?.id;
  const postRequest = usePostRequest({ url: reviewList });
  const editRequest = usePatchRequest({ url: `${reviewList}/${id}` });
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const postReviewHandler = async (values) => {
    const { response, success } = await postRequest.request({
      data: { ...values },
    });
    if (success) {
      form.setFieldsValue(response.data);
      getReview.request();
      setOpen(false);
      form.resetFields();
      setFileList([]);
    }
  };

  const editReviewHandler = async (values) => {
    const { response, success } = await editRequest.request({
      data: { ...values },
    });
    if (success) {
      form.setFieldsValue(response.data);
      getReview.request();
      setOpen(false);
      setEditing(false);
      form.resetFields();
      setFileList([]);
    }
  };

  const onSubmit = (values) => {
    console.log(values);
    editing ? editReviewHandler(values) : postReviewHandler(values);
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
            label="Rating"
            name={"rating"}
            rules={[
              {
                required: true,
                message: "Please input rating!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="form-items">
          <Form.Item
            label="Review"
            name={"review"}
            rules={[
              {
                required: true,
                message: "Please input review!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name={"date"}
            rules={[
              {
                required: true,
                message: "Please input date!",
              },
            ]}
          >
            <Input placeholder="10/10/2022" />
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
            label="URL"
            name={"url"}
            rules={[
              {
                required: true,
                message: "Please input URL!",
              },
              {
                type: "url",
                warningOnly: true,
              },
              {
                type: "string",
                min: 6,
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

export default ReviewDrawer;
