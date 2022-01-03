import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Innovant App" />
        <link rel="icon" href="/logo.PNG" />
      </Head>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.logohome}>
          <div className={styles.logopos}>
            <div className={styles.less_symbol}></div>
            <div className={styles.grater_symbol}></div>
          </div>
        </div>
        <p className={styles.p}>The Logo Above is Made in Pure CSS</p>
      </div>
      <Footer />
    </div>
  );
}
