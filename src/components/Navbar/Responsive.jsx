import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";

const NavbarMenu = [
  { id: 1, title: "Home", link: "#home" },
  { id: 2, title: "Product", link: "/product" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "About", link: "/about" },
];

const ResponsiveMenu = ({ open, setOpen, mode, onToggleMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // disable scroll saat menu terbuka
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  const handleNavigation = (menu) => {
    if (menu.link.startsWith("#")) {
      const sectionId = menu.link.substring(1);
      if (location.pathname === "/") {
        setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black z-30"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar mobile */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed top-24 right-6 
              ${
                mode === "dark"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              } 
              shadow-xl z-40 rounded-2xl px-8 py-5 flex flex-col gap-5 w-fit`}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col items-center gap-4 text-lg font-medium">
              {NavbarMenu.map((menu) => (
                <li key={menu.id} className="group relative">
                  <button
                    onClick={() => handleNavigation(menu)}
                    className="relative pb-1 hover:text-primary dark:hover:text-white transition-colors duration-300"
                  >
                    {menu.title}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Toggle Theme */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onToggleMode} // panggil parent toggleMode
              className={`mt-3 w-16 h-8 rounded-full relative flex items-center transition-colors duration-300
    ${mode === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
            >
              <motion.div
                layout
                className={`absolute w-7 h-7 rounded-full flex items-center justify-center shadow-md
      ${mode === "dark" ? "bg-gray-900 right-0.5" : "bg-white left-0.5"} 
      text-primary dark:text-white`}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {mode === "dark" ? <BsMoon /> : <BsSun />}
              </motion.div>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
