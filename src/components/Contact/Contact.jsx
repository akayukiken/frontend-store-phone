import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact") {
      const section = document.getElementById("contact");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const namePattern = /^[A-Za-z\s]*$/;
  const messagePattern = /^[A-Za-z0-9\s!?.,;:()[\]{}'"\/\\-]*$/;

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(
      !namePattern.test(value) ? "Nama hanya boleh huruf dan spasi." : ""
    );
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setMessageError(!messagePattern.test(value) ? "Pesan tidak valid." : "");
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (nameError || messageError) {
      alert("⚠️ Tolong perbaiki input sebelum mengirim.");
      return;
    }

    setIsSending(true);
    try {
      await emailjs.sendForm(
        "service_tz6ngs6",
        "template_fgo3bqe",
        e.target,
        "iYDE40Bv-7RKLLP3o"
      );
      alert("✅ Pesan berhasil dikirim!");
      e.target.reset();
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("❌ Gagal mengirim pesan. Coba lagi ya.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-32 md:py-40 px-6 xl:px-32 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Kontak */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 text-justify text-base"
          >
            <h1 className="text-4xl font-bold mb-6">Hubungi Kami</h1>
            <p className="leading-relaxed">
              Kami di <strong>storePHONE</strong> siap membantu Anda! Hubungi
              kami untuk pertanyaan produk, bantuan pemesanan, atau saran dan
              masukan. Tim kami akan merespon secepat mungkin di jam operasional
              berikut:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Senin – Jumat:</strong> 09.00 – 17.00
              </li>
              <li>
                <strong>Sabtu:</strong> 09.00 – 13.00
              </li>
              <li>
                <strong>Minggu & Hari Libur:</strong> Tutup
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <MdEmail className="text-xl" />
              <a
                href="mailto:support@storephone.id"
                className="text-blue-600 hover:underline"
              >
                support@storephone.id
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-xl text-green-600" />
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                +62 812-3456-7890
              </a>
            </div>
          </motion.div>

          {/* Formulir Kontak */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 bg-white dark:bg-gray-900 p-8 md:p-8 rounded-xl shadow-md w-full max-w-[420px] lg:max-w-lg ml-auto relative"
          >
            <h2 className="text-2xl font-semibold mb-6">Formulir Kontak</h2>
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-4 text-base"
            >
              <div>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Nama Anda"
                  required
                  value={name}
                  onChange={handleNameChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-blue-400"
                />
                {nameError && (
                  <p className="text-sm text-red-600 mt-1">{nameError}</p>
                )}
              </div>

              <input
                type="email"
                name="user_email"
                placeholder="Email Anda"
                required
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-blue-400"
              />

              <div>
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  rows="5"
                  required
                  value={message}
                  onChange={handleMessageChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-blue-400"
                />
                {messageError && (
                  <p className="text-sm text-red-600 mt-1">{messageError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded transition duration-300 flex justify-center items-center`}
              >
                {isSending ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
