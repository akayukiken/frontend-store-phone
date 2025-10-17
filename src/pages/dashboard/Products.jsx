import React, { useEffect, useState } from "react";
import { Table, Button, Image, Card, Spin, Row, Col, Typography, Space, message } from "antd";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import { Link } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(URL_PRODUCT);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      message.error("Gagal memuat produk 😢");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL_PRODUCT}/${id}`);
      message.success("Produk berhasil dihapus 🗑️");
      fetchProducts();
    } catch (err) {
      console.log(err);
      message.error("Gagal menghapus produk 😣");
    }
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (_, record) => (
        <Image
          src={record?.thumbnail}
          width={80}
          height={80}
          style={{ objectFit: "cover", borderRadius: "8px" }}
          preview={false}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => `Rp ${value.toLocaleString("id-ID")}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Link to={`/dashboard/products/${record?._id}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record?._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            📦 Daftar Produk
          </Title>
          <Text type="secondary">
            Kelola semua produk yang ada di toko kamu~
          </Text>
        </Col>
        <Col>
          <Link to="/dashboard/products/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Tambah Produk
            </Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      ) : isMobile ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => (
            <Card
              key={product._id}
              hoverable
              style={{
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              cover={
                <img
                  alt={product.name}
                  src={product.thumbnail}
                  style={{
                    height: 180,
                    width: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
              }
            >
              <Title level={5}>{product.name}</Title>
              <Text strong>Rp {product.price.toLocaleString("id-ID")}</Text>
              <p>
                <Text type="secondary">Stok: {product.stock}</Text>
              </p>

              <Space style={{ marginTop: 8 }}>
                <Link to={`/dashboard/products/${product._id}`}>
                  <Button type="primary" icon={<EditOutlined />}>
                    Edit
                  </Button>
                </Link>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(product._id)}
                >
                  Hapus
                </Button>
              </Space>
            </Card>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: "24px" }}>
          <Table
            dataSource={products}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 8 }}
            bordered
          />
        </div>
      )}
    </div>
  );
};

export default Products;
