"use client";

import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const [toggleMenu, setToggleMenue] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); //لمنع الضغط عند ال animation
  const [animateCloseBtn, setAnimateCloseBtn] = useState(false);

  const handleMenueClick = () => {
    if (isAnimating) return;
    setToggleMenue(true);
  };
  const handleCloseClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimateCloseBtn(true);

    setTimeout(() => {
      setAnimateCloseBtn(false);
      setToggleMenue(false);
      setIsAnimating(false);
    }, 300);
  };
  return (
    <nav className={styles.navbar}>
      {/* logo */}
      <div>
        <Link href="/" className={`text-purple-600 ${styles.logo}`}>
          CLOUD
          <GrTechnology />
          HOSTING
        </Link>
        {/* menu-icon */}
        <div className={styles.menu}>
          {toggleMenu ? (
            <IoMdClose
              className={`${styles.close} ${
                animateCloseBtn ? styles.animate : ""
              }`}
              onClick={handleCloseClick}
            />
          ) : (
            <AiOutlineMenu onClick={handleMenueClick} />
          )}
        </div>
      </div>
      {/* links */}
      <div
        className={styles.navLinksWrapper}
        style={{
          clipPath:
            (toggleMenu && "polygon(0 1%, 100% 0, 100% 100%, 0% 100%)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            onClick={() => setToggleMenue(false)}
            className={`hover:text-blue-900 ${styles.navLink}`}
            href="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setToggleMenue(false)}
            className={`hover:text-blue-900 ${styles.navLink}`}
            href="/articles?pageNumber=1"
          >
            Articles
          </Link>
          <Link
            onClick={() => setToggleMenue(false)}
            className={`hover:text-blue-900 ${styles.navLink}`}
            href="/about"
          >
            About
          </Link>

          {isAdmin && (
            <Link
              onClick={() => setToggleMenue(false)}
              className={`hover:text-blue-900 ${styles.navLink}`}
              href="/admin"
            >
              Admin Dashboard
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
