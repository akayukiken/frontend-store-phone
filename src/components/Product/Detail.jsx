import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_PRODUCT, URL_TRANSACTION } from "../../utils/Endpoint";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const DetailProduct = ({ mode = "light" }) => {
  // ✅ mode diterima dari App.jsx
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [buyerName, setBuyerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableStock, setAvailableStock] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${URL_PRODUCT}/${id}`);
        setProduct(res.data);
        setAvailableStock(res.data.stock || 0);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
      setAvailableStock(availableStock - 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setAvailableStock(availableStock + 1);
    }
  };

  const handleBuy = async () => {
    if (quantity < 1 || buyerName.trim() === "") return;

    const data = {
      first_name: buyerName,
      amount: product.price * quantity,
      product_id: product._id,
      quantity,
    };

    try {
      setLoading(true);
      const res = await axios.post(URL_TRANSACTION, data);
      const snapToken = res.data.snap_token;

      localStorage.setItem("checkoutQuantity", quantity);

      window.snap.pay(snapToken, {
        onSuccess: function () {
          window.location.href = `/success-payment/${product._id}`;
        },
        onPending: function () {
          alert("Menunggu pembayaran");
        },
        onError: function () {
          alert("Pembayaran gagal");
        },
        onClose: function () {
          alert("Pembayaran dibatalkan");
        },
      });
    } catch (err) {
      console.error("Checkout error", err);
      alert("Gagal melakukan checkout");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <p
        className={`text-center py-20 ${
          mode === "dark" ? "text-gray-800" : "text-gray-800"
        }`}
      >
        Memuat detail produk... 🌀
      </p>
    );
  }

  return (
    <div
      className={`max-w-8xl mx-auto px-6 py-8 mt-16 rounded-lg shadow-md transition-colors duration-500 ${
        mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Thumbnail */}
        <div className="md:col-span-4">
          <Zoom>
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover cursor-zoom-in shadow-md"
            />
          </Zoom>
        </div>

        {/* Deskripsi */}
        <div className="md:col-span-5">
          <h2 className="text-2xl font-poppins font-bold">{product.name}</h2>
          <p className={mode === "dark" ? "text-gray-400" : "text-gray-500"}>
            {product.sales || 0} Terjual
          </p>
          <p className="font-semibold mt-2">Kondisi: {product.kondisi}</p>
          <p className="font-semibold mt-2">Ram: {product.ram}</p>
          <p className="font-semibold mt-2">Rom: {product.rom}</p>
          <p className="font-semibold mt-2">Warna: {product.warna}</p>
          <h3 className="text-2xl font-bold mt-4 mb-2">Deskripsi Produk</h3>
          <p className={mode === "dark" ? "text-gray-400" : "text-gray-500"}>
            {product.description}
          </p>
        </div>

        {/* Card Pembelian */}
        <div
          className={`md:col-span-3 p-6 rounded-lg shadow-inner transition-colors duration-500 ${
            mode === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-50 text-gray-800"
          }`}
        >
          <p className="font-poppins text-2xl font-bold mb-3">
            Atur Jumlah dan Nama
          </p>
          <p className="text-2xl font-bold mb-2">
            Rp{(product.price * quantity).toLocaleString("id-ID")}
          </p>

          {/* Kuantitas */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kuantitas</label>
            <div
              className={`flex items-center border rounded-md w-max transition-colors duration-500 ${
                mode === "dark" ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <button
                className={`px-3 py-1 transition-colors duration-300 ${
                  mode === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={decrementQuantity}
                disabled={quantity <= 0}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  if (val <= 0) {
                    setQuantity(0);
                    setAvailableStock(product.stock);
                  } else if (val <= product.stock) {
                    setAvailableStock(product.stock - val);
                    setQuantity(val);
                  }
                }}
                className={`w-14 text-center outline-none border-x transition-colors duration-500 ${
                  mode === "dark"
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                min="0"
                max={product.stock}
              />
              <button
                className={`px-3 py-1 transition-colors duration-300 ${
                  mode === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={incrementQuantity}
                disabled={availableStock <= 0}
              >
                +
              </button>
            </div>
          </div>

          <p className="text-sm mb-4">Stok Tersisa: {availableStock}</p>

          {/* Nama */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nama</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className={`w-full p-2 border rounded-md outline-none transition-colors duration-500 ${
                mode === "dark"
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
              placeholder="Masukkan Nama Anda"
            />
          </div>

          {/* Button Beli */}
          <button
            onClick={handleBuy}
            disabled={quantity < 1 || buyerName.trim() === ""}
            className={`w-full ${
              quantity < 1 || buyerName.trim() === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            } text-white font-semibold py-3 rounded-md transition mb-4 flex justify-center items-center`}
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                Memproses...
              </>
            ) : (
              "Beli Sekarang"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;