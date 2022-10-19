import React, {  useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDeleteRequest, useLoad } from "../hooks/request";
import { teamList } from "../utils/urls";
import TeamDrawer from "../components/TeamDrawer";

const { Column } = Table;


const Team = () => {
  const getTeams = useLoad({ url: teamList });
  const { loading, response: tableData } = getTeams;
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [editing, setEditing] = useState(false);
  const deleteTeam = useDeleteRequest({url: `${teamList}/${select?.id}`})


  const addTeamHandler = () => {
    setOpen(true);
  };

  const editTeamHandler = (record) => {
    setSelect(record);
    setEditing(true);
    setOpen(true);
  };

  const deleteHandler=async()=>{
    const {success} = await deleteTeam.request()
    if(success){
      getTeams.request()
    }

}
  return (
    <div>
      <Button
        loading={loading}
        onClick={addTeamHandler}
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
        <Column title={"Job"} dataIndex={"job"} key="job" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" key={record.id}>
              <a onClick={() => editTeamHandler(record)}>{"Edit"}</a>
              <Popconfirm
              className="popconfirm"
                placement="leftBottom"
                title={"Do you want to delete it"}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                onConfirm={()=>deleteHandler()}
                okText={"Yes"}
                cancelText={"No"}
              >
                <a onClick={()=>setSelect(record)}>{"Delete"}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <TeamDrawer
      loading={loading}
        open={open}
        setOpen={setOpen}
        getTeams={getTeams}
        editing={editing}
        setEditing={setEditing}
        select={select}
        setSelect={setSelect}
      />
    </div>
  );
}

export default Team