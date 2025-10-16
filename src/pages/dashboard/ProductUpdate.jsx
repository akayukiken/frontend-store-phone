import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint"; // Ganti dengan URL backend Anda
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${URL_PRODUCT}/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        form.setFieldsValue({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          kondisi: res.data.kondisi,
          ram: res.data.ram,
          rom: res.data.rom,
          warna: res.data.warna,
          stock: res.data.stock,
        });
        // Mengatur thumbnail saat ini
        if (res.data.thumbnail) {
          setFileList([
            {
              uid: "-1",
              name: "thumbnail.png",
              status: "done",
              url: res.data.thumbnail,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani submit form
  const handleSubmit = async (values) => {
    setLoading(true);

    if (
      fileList.length === 0 ||
      (!fileList[0].originFileObj && !fileList[0].url)
    ) {
      message.error("Please upload a thumbnail!");
      setLoading(false);
      return;
    }

    console.log("values", values);
    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("kondisi", values.kondisi);
    data.append("ram", values.ram);
    data.append("rom", values.rom);
    data.append("warna", values.warna);
    data.append("stock", values.stock);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      data.append("thumbnail", fileList[0].originFileObj);
    }

    try {
      await axios.patch(`${URL_PRODUCT}/${id}`, data);
      message.success("Product added successfully");
      form.resetFields();
      setFileList([]);
      navigate("/dashboard/products");
    } catch (error) {
      message.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani perubahan file upload
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div>
      <h1>Edit Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{}}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input product name" }]}
        >
          <Input placeholder="Enter Product Name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input product price" }]}
        >
          <Input type="number" placeholder="Enter Product Price" />
        </Form.Item>

        <Form.Item
          name="kondisi"
          label="Kondisi"
          rules={[{ required: true, message: "Please select product kondisi" }]}
        >
          <Select placeholder="Pilih Kondisi Produk">
            <Option value="Baru">Baru</Option>
            <Option value="Second">Second</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="ram"
          label="RAM"
          rules={[{ required: true, message: "Please select product RAM" }]}
        >
          <Select placeholder="Pilih RAM Produk">
            <Option value="1 GB">1 GB</Option>
            <Option value="2 GB">2 GB</Option>
            <Option value="3 GB">3 GB</Option>
            <Option value="4 GB">4 GB</Option>
            <Option value="6 GB">6 GB</Option>
            <Option value="8 GB">8 GB</Option>
            <Option value="12 GB">12 GB</Option>
            <Option value="16 GB">16 GB</Option>
            <Option value="24 GB">24 GB</Option>
            <Option value="32 GB">32 GB</Option>
            <Option value="64 GB">64 GB</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="rom"
          label="ROM"
          rules={[{ required: true, message: "Please select product ROM" }]}
        >
          <Select placeholder="Pilih ROM Produk">
            <Option value="8 GB">8 GB</Option>
            <Option value="16 GB">16 GB</Option>
            <Option value="32 GB">32 GB</Option>
            <Option value="64 GB">64 GB</Option>
            <Option value="128 GB">128 GB</Option>
            <Option value="256 GB">256 GB</Option>
            <Option value="512 GB">512 GB</Option>
            <Option value="1 TB">1 TB</Option>
            <Option value="2 TB">2 TB</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="warna"
          label="Warna"
          rules={[{ required: true, message: "Please select product warna" }]}
        >
          <Select placeholder="Pilih Warna Produk">
            <Option value="Hitam">Hitam</Option>
            <Option value="Putih">Putih</Option>
            <Option value="Abu-abu">Abu-abu</Option>
            <Option value="Perak">Perak</Option>
            <Option value="Emas">Emas</Option>
            <Option value="Rose Gold">Rose Gold</Option>
            <Option value="Biru">Biru</Option>
            <Option value="Merah">Merah</Option>
            <Option value="Hijau">Hijau</Option>
            <Option value="Ungu">Ungu</Option>
            <Option value="Coklat">Coklat</Option>
            <Option value="Oranye">Oranye</Option>
            <Option value="Kuning">Kuning</Option>
            <Option value="Biru Muda">Biru Muda</Option>
            <Option value="Biru Tua">Biru Tua</Option>
            <Option value="Hijau Tua">Hijau Tua</Option>
            <Option value="Hijau Muda">Hijau Muda</Option>
            <Option value="Pink">Pink</Option>
            <Option value="Violet">Violet</Option>
            <Option value="Grafit">Grafit</Option>
            <Option value="Midnight">Midnight</Option>
            <Option value="Starlight">Starlight</Option>
            <Option value="Titanium">Titanium</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
        >
          <Input.TextArea placeholder="Enter Product Description" rows={4} />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: "Please enter product stock" }]}
        >
          <Input type="number" placeholder="Enter Stock Quantity" />
        </Form.Item>

        <Form.Item label="Thumbnail">
          <Upload
            beforeUpload={() => false}
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
