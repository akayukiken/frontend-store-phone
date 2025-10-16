import React, { useEffect } from "react";
import AboutPng from "../../assets/about.png";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();

  // Auto-scroll ke #about bila URL mengandung hash
  useEffect(() => {
    if (location.hash === "#about") {
      const section = document.getElementById("about");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section
      id="about"
      className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-white py-32 md:py-40 px-6 transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Teks Keterangan */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-center lg:text-left space-y-4"
        >
          <h2 className="text-4xl font-bold mb-4">Tentang Kami</h2>
          <p className="text-lg">
            Selamat datang di <span className="font-semibold">storePHONE</span>,
            tempat terbaik untuk menemukan perangkat dan aksesoris handphone
            yang kamu butuhkan! Kami hadir untuk memberikan solusi terbaik bagi
            kebutuhan teknologi mobile kamu.
          </p>
          <p className="text-lg">
            Dari charger, earphone, casing, hingga smartphone terbaru, semuanya
            tersedia di sini. Dengan pelayanan cepat dan ramah, kami siap
            menjadi partner terbaikmu!
          </p>
          <p className="text-lg flex items-center gap-3">
            📱 Yuk, jelajahi produk kami dan temukan perangkat impianmu sekarang
            juga!
          </p>
        </motion.div>

        {/* Gambar */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[360px] lg:max-w-lg relative group"
        >
          <div className="overflow-hidden w-full rounded-xl shadow-lg border border-white/10">
            <motion.img
              src={AboutPng}
              alt="Tentang Kami"
              className="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;