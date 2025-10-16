import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { MdMenu, MdClose } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import ResponsiveMenu from "./Responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavbarMenu = [
  { id: 1, title: "Home", link: "#home" },
  { id: 2, title: "Product", link: "/product" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "About", link: "/about" },
];

const Navbar = ({ mode, toggleMode }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (menu) => {
    if (menu.link.startsWith("#")) {
      const sectionId = menu.link.substring(1);
      if (location.pathname === "/") {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
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
    } else {
      navigate(menu.link);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (location.pathname !== "/product") setSearchTerm("");
  }, [location.pathname]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/product?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <nav className={`p-4 fixed top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out ${mode === "dark" ? "bg-gray-900 text-white" : "bg-primary text-white"}`}>
        <motion.div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-bold">
              <span className="lowercase font-semibold italic">store</span>
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text ml-1 italic">
                PHONE
              </span>
            </h1>
          </div>

          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center gap-6">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <button
                  onClick={() => handleNavigation(menu)}
                  className="py-1 px-3 hover:text-white hover:shadow-[0_3px_0_-1px_#fff] font-semibold transition-all duration-300"
                >
                  {menu.title}
                </button>
              </li>
            ))}
          </ul>

          {/* Search + Theme + Mobile Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-[400px]">
              <input
                type="text"
                placeholder="Cari new Phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className={`w-full p-2 pl-4 pr-10 rounded-full outline-none transition-colors duration-500 ease-in-out ${mode === "dark" ? "bg-gray-700 text-white placeholder-gray-300" : "bg-white text-primary placeholder-gray-500"}`}
              />
              <BiSearch className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-primary"}`} />
            </div>

            {/* Toggle Mode */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMode}
              className={`hidden md:block text-2xl p-2 rounded-full transition-all duration-500 ease-in-out ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-primary"}`}
            >
              {mode === "dark" ? <BsMoon /> : <BsSun />}
            </motion.button>

            {/* Mobile toggle */}
            <div className="md:hidden ml-2" onClick={() => setOpen(!open)}>
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <MdClose className="text-4xl transition-colors duration-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <MdMenu className="text-4xl transition-colors duration-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Responsive Menu */}
      <ResponsiveMenu open={open} setOpen={setOpen} mode={mode} onToggleMode={toggleMode} />
    </>
  );
};

export default Navbar;