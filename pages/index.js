import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import styles from "../styles/SignIn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Login = ({ navigation }) => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const url = "http://localhost:3001/api/login";

  const handleLogin = async (credentials, setSubmitting) => {
    handleMessage(null);

    axios
      .post(url, credentials)
      .then(async (response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          try {
            router.push("/home");
          } catch (error) {
            console.log("error to save data");
          }
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage("An error occurred. Check your network and try again");
        console.log(error);
      });
  };

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="innovant App" />
        <link rel="icon" href="/logo.PNG" />
      </Head>
      <div className={styles.nav1}>
        <div className={styles.main1}>
          <font className={styles.txt2}>
            <Link href="/">Sign in</Link>
          </font>
          <font className={styles.txt1}>
            <Link href="/register">Register</Link>
          </font>
        </div>
      </div>

      <NavBar />

      <form name="formone">
        <div className={styles.body}>
          <table className={styles.tab1}>
            <tbody>
              <tr>
                <td>
                  <div className={styles.verif}>
                    <FontAwesomeIcon
                      className={styles.facheck}
                      icon={faCheck}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className={styles.td2}>
                  <Link href={{ pathname: "/register" }}>
                    <FontAwesomeIcon
                      className={styles.iconuser}
                      icon={faUserPlus}
                    />
                  </Link>
                  <p className={styles.txt4}>
                    <Link href={{ pathname: "/register" }}>Register</Link>
                  </p>
                  <p className={styles.txt5}>Browse and find what you need</p>
                </td>
                <td className={styles.td}>
                  <Link href={{ pathname: "/" }}>
                    <FontAwesomeIcon
                      className={styles.iconuser}
                      icon={faSignInAlt}
                    />
                  </Link>
                  <p className={styles.txt4}>
                    <Link href={{ pathname: "/" }}>Sign in</Link>
                  </p>
                  <p className={styles.txt5}>
                    Already have an account then welcome back
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (email == "" || password == "") {
                handleMessage("Please fill in all fields");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <div className={styles.inputfield}>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email*"
                  value={values.email}
                  onChange={handleChange("email")}
                  required
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Password*"
                  value={values.password}
                  onChange={handleChange("password")}
                  required
                />
                <p style={{ color: "red", fontSize: 15, textAlign: "center" }}>
                  {message}
                </p>

                <button
                  type="submit"
                  className={styles.btnlogin}
                  onClick={handleSubmit}
                >
                  <p className={styles.txt6}>Submit</p>
                </button>
              </div>
            )}
          </Formik>
        </div>
      </form>

      <Footer />
    </div>
  );
};
export default Login;
