import React, { useState, useEffect, useContext } from "react";
import { useLocation,Link,Routes,Route } from "react-router-dom";
import { Layout, Menu, PageHeader, Space, Dropdown, Avatar } from "antd";
import { menubar, routes} from "../utils/routes";
import Login from "../pages/Login";
import { Context } from "../contexts/UserContext";


const { Content, Sider } = Layout;

const MainLayout = () => {
    const {user} = useContext(Context)
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(["1"]);

  useEffect(() => {
    for (let item of menubar) {
      if (item.path === location.pathname) {
        setActiveMenu([`${item.id}`]);
      }
    }
  }, [location]);

  return (
    <>
    {user ? (
      <Layout>
        <PageHeader title={"Carship National"} />
        <Layout>
          <Sider width={300}>
            <Menu
              mode="inline"
              selectedKeys={activeMenu}
              items={menubar.map((item) => ({
                key: item.id,
				icon: React.createElement(item.icon),
                label: <Link to={item.path}>{item.title}</Link>,
              }))}
            />
          </Sider>
          <Layout>
            <Content>
              <Routes>
                    {routes.map((item) => (
                      <Route
                        key={item.id}
                        path={item.path}
                        element={item.component}
                      />
                    ))}
                  </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>):(
        <Login/>
      )}
    </>
  );
};

export default MainLayout;
