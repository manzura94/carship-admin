import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDeleteRequest, useLoad } from "../hooks/request";
import { blogList } from "../utils/urls";
import BlogsDrawer from "../components/BlogsDrawer";

const { Column } = Table;

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [editing, setEditing] = useState(false);
  const getBlogs = useLoad({ url: blogList });
  const { loading, response: tableData } = getBlogs;
  const deleteBlog = useDeleteRequest({ url: `${blogList}/${select?.id}` });

  const addBlogHandler = () => {
    setOpen(true);
  };

  const editBlogHandler = (record) => {
    setSelect(record);
    setEditing(true);
    setOpen(true);
  };

  const deleteHandler = async () => {
    const { success } = await deleteBlog.request();
    if (success) {
      getBlogs.request();
    }
  };

  return (
    <div>
      <Button
        loading={loading}
        onClick={addBlogHandler}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        dataSource={tableData?.data}
        pagination={false}
        rowKey="id"
        loading={loading}
      >
        <Column
          title={"Image"}
          dataIndex={"image"}
          key="image"
          render={(text) => (
            <Space size="middle">
              <img src={text} alt="image" className="column-image" />
            </Space>
          )}
        />
        <Column title={"Title"} dataIndex="title" key="title" />
        <Column title={"Subtitle"} dataIndex={"sub_title"} key="sub_title" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" key={record.id}>
              <a onClick={() => editBlogHandler(record)}>{"Edit"}</a>
              <Popconfirm
                placement="leftBottom"
                title={"Do you want to delete it"}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                onConfirm={() => deleteHandler()}
                okText={"Yes"}
                cancelText={"No"}
              >
                <a onClick={() => setSelect(record)}>{"Delete"}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <BlogsDrawer
        loading={loading}
        open={open}
        setOpen={setOpen}
        getBlogs={getBlogs}
        editing={editing}
        setEditing={setEditing}
        select={select}
        setSelect={setSelect}
      />
    </div>
  );
};

export default Blogs;
