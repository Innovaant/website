import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.topnav}>
      <a href="">
        {" "}
        <Image width={76} height={75} src="/logo.PNG" alt="logo"></Image>
      </a>
      <div className={styles.div2}>
        <Link href="/home">Home</Link>
        <Link href="#">About us</Link>
        <Link href="#">Contact us</Link>
        <span className={styles.cercleProfil}>
          <p className={styles.txt3}>Ar</p>
        </span>
      </div>
    </div>
  );
}
