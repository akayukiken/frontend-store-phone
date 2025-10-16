import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import ProductList from "./components/Product/ProductList";
import Product from "./components/Product/Product";
import Detail from "./components/Product/Detail";
import ScrollToTop from "./scroll/ScrollToTop";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardHome from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/ProductCreate";
import UpdateProduct from "./pages/dashboard/ProductUpdate";
import ProtectedRoute from "./utils/ProtectedRoute";
import SuccessPayment from "./pages/SuccessPayment";

import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const App = () => {
  const [mode, setMode] = useState("light");
  const [collapsed, setCollapsed] = useState(false);

  // load mode dari localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("mode") || "light";
    setMode(savedMode);
    document.documentElement.className = savedMode;
  }, []);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    document.documentElement.className = newMode;
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const DashboardLayout = () => (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: "16px", marginLeft: "16px" }}
          />
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            minHeight: "280px",
            overflowX: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<AddProduct />} />
            <Route path="products/:id" element={<UpdateProduct />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} />
              <Hero mode={mode} />
              <ProductList mode={mode} />
              <Footer mode={mode} />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} />
              <Product mode={mode} />
              <Footer mode={mode} />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} />
              <Contact mode={mode} />
              <Footer mode={mode} />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} />
              <About mode={mode} />
              <Footer mode={mode} />
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} />
              <Detail mode={mode} />
              <Footer mode={mode} />
            </>
          }
        />
        <Route
          path="/success-payment/:id"
          element={<SuccessPayment mode={mode} />}
        />

        {/* Auth Route */}
        <Route path="/signin" element={<Login />} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
