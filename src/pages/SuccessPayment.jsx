import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_PRODUCT } from "../utils/Endpoint";
import { motion } from "framer-motion";

const SuccessPayment = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const quantity = parseInt(localStorage.getItem("checkoutQuantity")) || 1;

  useEffect(() => {
    const updateStock = async () => {
      try {
        const res = await axios.get(`${URL_PRODUCT}/${id}`);
        const fetchedProduct = res.data;

        setProduct(fetchedProduct); // simpan produk untuk tampil di ringkasan

        await axios.patch(`${URL_PRODUCT}/${id}`, {
          stock: (fetchedProduct.stock || 0) - quantity,
          sales: (fetchedProduct.sales || 0) + quantity,
        });

        localStorage.removeItem("checkoutQuantity");
      } catch (err) {
        console.error("Gagal update stock/sales:", err.response || err.message);
      }
    };

    updateStock();
  }, [id, quantity]);

  const totalPrice = product ? product.price * quantity : 0;

  return (
    <div className="bg-[#f3f3f3] dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10 max-w-xl w-full text-center"
      >
        <div className="text-green-500 text-6xl mb-4 animate-bounce">✅</div>
        <h4 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Pembayaran Berhasil
        </h4>

        <div className="flex flex-wrap justify-center gap-x-1 text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6">
          <span>Terima Kasih Telah Belanja di</span>
          <span className="text-foreground font-bold">StorePHONE</span>
        </div>

        {product && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 text-gray-800 dark:text-white">
            <p>
              <span className="font-semibold">{product.name}</span> x {quantity}
            </p>
            <p className="mt-1 font-semibold">
              Total: Rp{totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/product")}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all font-semibold shadow-md"
        >
          <ChevronLeft size={20} />
          Kembali
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SuccessPayment;