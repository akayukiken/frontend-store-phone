import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = () => {
    if (location.pathname.includes("/dashboard/products")) return "2";
    if (location.pathname.includes("/dashboard")) return "1";
    return "";
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };

  // Tutup sidebar otomatis saat link diklik (khusus untuk mobile)
  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      onCollapse(true);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        if (broken) {
          onCollapse(true);
        }
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey()]}>
        <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() => handleNavigate("/dashboard")}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => handleNavigate("/dashboard/products")}>
          Products
        </Menu.Item>
        <Menu.Item key="3" icon={<LogoutOutlined />}>
          <button onClick={handleLogout}>Logout</button>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;