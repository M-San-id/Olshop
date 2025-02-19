import React from "react";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-menu">
          <a href="/shop">Belanja</a>
          <a href="/cart">Keranjang</a>
        </div>
        <button className="scroll-to-top" onClick={scrollToTop}>
          Kembali ke atas
        </button>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} SansStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
