import React from "react";
import HeroPng from "../../assets/iphone.png";
import { motion } from "framer-motion";
import { FadeRight, FadeLeft } from "../../utility/animation";
import { useNavigate, useLocation } from "react-router-dom";

const Hero = ({ mode = "light" }) => { // ✅ mode diterima dari App.jsx
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToProduct = () => {
    const sectionId = "ProductList";

    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { replace: true });
      const checkSection = setInterval(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          clearInterval(checkSection);
        }
      }, 100);
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-6 md:px-20 py-20 md:py-32 lg:py-24 transition-colors duration-500
        ${mode === "dark" ? "bg-gray-800" : "bg-[#f3f3f3]"}`}
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[450px] relative">
        {/* Gambar di kiri */}
        <div className="flex justify-center items-center order-1 md:order-none">
          <motion.img
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            src={HeroPng}
            alt="iPhone"
            className="w-[300px] md:w-[500px] drop-shadow-xl"
          />
        </div>

        {/* Teks di kanan */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
          <div className="text-center md:text-left space-y-6 lg:max-w-[450px]">
            <motion.h1
              variants={FadeLeft(0.3)}
              initial="hidden"
              animate="visible"
              className={`text-4xl lg:text-5xl font-bold transition-colors duration-500
                ${mode === "dark" ? "text-white" : "text-black"}`}
            >
              Toko HP Paling Murah!
            </motion.h1>

            <motion.p
              variants={FadeLeft(0.6)}
              initial="hidden"
              animate="visible"
              className={`font-semibold text-2xl transition-colors duration-500
                ${mode === "dark" ? "text-blue-400" : "text-blue-600"}`}
            >
              Produk Second Berkualitas
            </motion.p>

            <motion.p
              variants={FadeLeft(0.9)}
              initial="hidden"
              animate="visible"
              className={`text-base lg:text-lg transition-colors duration-500
                ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Menyediakan berbagai macam Handphone kualitas terbaik, dengan
              harga terjangkau
            </motion.p>

            <motion.div
              variants={FadeLeft(1.2)}
              initial="hidden"
              animate="visible"
              className="flex justify-center md:justify-start"
            >
              <button
                onClick={handleScrollToProduct}
                className={`primary-btn px-6 py-3 rounded-full text-white font-semibold shadow-md transition duration-300 hover:brightness-110
                  ${mode === "dark"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"}`}
              >
                Lihat Produk
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;