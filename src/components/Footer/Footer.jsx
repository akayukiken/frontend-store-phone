import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start text-center md:text-left">
        {/* Info Produk */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Produk Apa yang Ada Disini?</h2>
          <p className="text-sm text-gray-300">
            Kami menjual handphone second berkualitas tinggi dengan performa
            terbaik, lengkap dengan garansi 1 tahun untuk kenyamanan Anda.
          </p>
        </div>

        {/* Kontak & Sosial Media */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold">Kontak Kami :</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 hover:bg-pink-500 hover:text-white transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 hover:bg-sky-400 hover:text-white transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 rounded-full p-3 hover:scale-110 hover:bg-blue-700 hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Links Tambahan */}
        <div className="space-y-3">
          <ul className="flex flex-wrap justify-center md:flex-col md:justify-start gap-x-4 gap-y-1 text-sm">
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-use" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="/sitemap" className="hover:underline">
                Global Sitemap
              </a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-sm mt-6 md:mt-0">
          © 2025{" "}
          <span className="font-semibold text-white">storePHONE Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
