"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
import { useNavigationEvent } from './useNavigationEvent'; // Adjust the import path accordingly

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  // Use the custom hook to handle pathname changes
  useNavigationEvent(() => {
    setIsMenuOpen(false); // Close the dropdown
    setIsOpen(false);     // Collapse the menu
  });

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <div key={i}>
                {subRoute.subRoutes ? (
                  <SidebarMenu
                    route={subRoute}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                ) : (
                  <motion.div variants={menuItemAnimation} custom={i}>
                    <Link href={subRoute.path} className="link" onClick={() => setIsMenuOpen(false)}>
                      <div className="icon">{subRoute.icon}</div>
                      <motion.div className="link_text text-neutral-300">
                        {subRoute.name}
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
