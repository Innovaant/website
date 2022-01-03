import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <Image
          width={195}
          height={150}
          src="/footerImg.jpeg"
          alt="logo"
        ></Image>
        <p className={styles.p1}>© All Rights Reserved.</p>
      </div>
    </footer>
  );
}
