import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTag, FaShoppingCart } from "react-icons/fa";
import { FadeLeft } from "../../utility/animation";

const ProductList = ({ mode }) => {
  const [productList, setProductList] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Hook drag scroll
  const useDragScroll = (ref) => {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
      const slider = ref.current;
      if (!slider) return;

      const startDrag = (e) => {
        isDragging.current = true;
        slider.classList.add("cursor-grabbing");
        startX.current = e.pageX ?? e.touches[0].pageX;
        scrollLeft.current = slider.scrollLeft;
      };

      const endDrag = () => {
        isDragging.current = false;
        slider.classList.remove("cursor-grabbing");
      };

      const moveDrag = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX ?? e.touches[0].pageX;
        const walk = (x - startX.current) * 1.5;
        slider.scrollLeft = scrollLeft.current - walk;
      };

      // Desktop
      slider.addEventListener("mousedown", startDrag);
      slider.addEventListener("mouseup", endDrag);
      slider.addEventListener("mouseleave", endDrag);
      slider.addEventListener("mousemove", moveDrag);

      // Mobile
      slider.addEventListener("touchstart", startDrag, { passive: true });
      slider.addEventListener("touchend", endDrag);
      slider.addEventListener("touchmove", moveDrag, { passive: false });

      return () => {
        slider.removeEventListener("mousedown", startDrag);
        slider.removeEventListener("mouseup", endDrag);
        slider.removeEventListener("mouseleave", endDrag);
        slider.removeEventListener("mousemove", moveDrag);
        slider.removeEventListener("touchstart", startDrag);
        slider.removeEventListener("touchend", endDrag);
        slider.removeEventListener("touchmove", moveDrag);
      };
    }, [ref]);
  };

  useDragScroll(scrollRef);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(
          "https://api-store-phone.vercel.app/api/products"
        );
        setProductList(response.data);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      }
    };
    fetchProductList();
  }, []);

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
    <div
      id="ProductList"
      className={`relative max-w-8xl mx-auto py-24 px-4 transition-colors duration-300
      ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"}`}
    >
      <h2 className="text-2xl font-bold text-center mb-10">Product Store</h2>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-1 cursor-grab select-none scrollbar-hide"
      >
        {productList
          .slice()
          .reverse()
          .map((product, index) => {
            const finalPrice = product.price || 0;
            const label = getLabel(product.kondisi);

            return (
              <motion.div
                key={`${product._id}-${index}`}
                variants={FadeLeft(index * 0.1)}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
                onClick={() => navigate(`/detail/${product._id}`)}
                className={`min-w-[300px] p-4 rounded-xl shadow-md flex flex-col justify-between cursor-pointer
                  ${mode === "dark" ? "bg-gray-800" : "bg-[#f3f3f3]"}`}
              >
                <div>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-lg"
                  />
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
                  <h3
                    className={`font-semibold text-lg mt-3 ${
                      mode === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold mt-1">
                    Rp{finalPrice.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-1">
                    <FaShoppingCart className="text-blue-500" />
                    <span
                      className={`text-sm ${
                        mode === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {product.sold || product.sales || 0} terjual
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/detail/${product._id}`);
                    }}
                    className="text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-3 py-1 rounded transition-all"
                  >
                    Lihat Selengkapnya
                  </button>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
