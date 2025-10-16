import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import { FaTag, FaShoppingCart } from "react-icons/fa";

const Product = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    setSearchTerm(keyword);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(URL_PRODUCT);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLabel = (kondisi) => {
    if (kondisi?.toLowerCase() === "baru")
      return {
        text: "Produk Baru",
        color: "bg-gradient-to-r from-emerald-400 to-green-500",
      };
    if (kondisi?.toLowerCase() === "second")
      return {
        text: "Produk Second",
        color: "bg-gradient-to-r from-orange-400 to-amber-500",
      };
    return null;
  };

  return (
    <section
      className={`w-full flex flex-col min-h-screen mx-auto py-24 px-6 md:px-0 overflow-hidden transition-colors duration-300
      ${mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      {/* Produk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-center py-2 md:px-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            const finalPrice = product.price || 0;
            const label = getLabel(product.kondisi);

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                onClick={() => navigate(`/detail/${product._id}`)}
                className={`rounded-xl shadow-md p-4 cursor-pointer hover:shadow-xl hover:scale-105 flex gap-4
                  ${mode === "dark" ? "bg-gray-900" : "bg-[#f3f3f3]"}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  {label && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex items-center gap-2 text-white text-xs px-2 py-1 rounded-full mt-3 ${label.color}`}
                    >
                      <FaTag />
                      <span>{label.text}</span>
                    </motion.div>
                  )}
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="font-bold text-blue-600 dark:text-blue-400">
                    Rp{finalPrice.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <FaShoppingCart className="text-blue-500" />
                    <span
                      className={`text-sm ${
                        mode === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {product.sold || product.sales || 0} terjual
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p
            className={`col-span-3 text-center ${
              mode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Tidak ada produk ditemukan 😥
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;
