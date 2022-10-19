import React, { useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDeleteRequest, useLoad } from "../hooks/request";
import { reviewList } from "../utils/urls";
import ReviewDrawer from "../components/ReviewDrawer";

const { Column } = Table;


const Review = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [editing, setEditing] = useState(false);
  const getReview = useLoad({ url: reviewList });
  const { loading, response: tableData } = getReview;
  const deleteReview = useDeleteRequest({url: `${reviewList}/${select?.id}`})

  const addReviewHandler = () => {
    setOpen(true);
  };
  
  const editReviewHandler = (record) => {
    setSelect(record);
    setEditing(true);
    setOpen(true);
  };
  console.log(select);
  
  const deleteHandler=async()=>{
      const {success} = await deleteReview.request()
      if(success){
        getReview.request()
      }

  }

  return (
    <div>
    <Button
      loading={loading}
      onClick={addReviewHandler}
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
      <Column title={"Name"} dataIndex="name" key="name" />
      <Column title={"Review"} dataIndex={"review"} key="review" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle" key={record.id}>
            <a onClick={() => editReviewHandler(record)}>{"Edit"}</a>
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
              <a onClick={()=>setSelect(record)}>{"Delete"}</a>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
    <ReviewDrawer
    loading={loading}
      open={open}
      setOpen={setOpen}
      getReview={getReview}
      editing={editing}
      setEditing={setEditing}
      select={select}
      setSelect={setSelect}
    />
  </div>
  )
}

export default Review