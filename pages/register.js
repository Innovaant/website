import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Formik } from "formik";
import axios from "axios";
import styles from "../styles/Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Signup = ({ navigation }) => {
  const router = useRouter();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://localhost:3001/api/register";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          router.push("/");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage("An error occurred. Check your network and try again");
      });
  };

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Innovant app" />
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
                  <Link href="/register">
                    <FontAwesomeIcon
                      className={styles.iconuser}
                      icon={faUserPlus}
                    />
                  </Link>
                  <p className={styles.txt4}>
                    <Link href="/register">Register</Link>
                  </p>
                  <p className={styles.txt5}>Browse and find what you need</p>
                </td>
                <td className={styles.td}>
                  <Link href="/">
                    <FontAwesomeIcon
                      className={styles.iconuser}
                      icon={faSignInAlt}
                    />
                  </Link>
                  <p className={styles.txt4}>
                    <Link href="/"> Sign in</Link>
                  </p>
                  <p className={styles.txt5}>
                    Already have an account then welcome back
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.firstname == "" ||
                values.lastname == "" ||
                values.email == "" ||
                values.password == "" ||
                values.confirmPassword == ""
              ) {
                handleMessage("Please fill in all fields");
                setSubmitting(false);
              } else if (values.password !== values.confirmpassword) {
                handleMessage("Passwords do not match");
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <div className={styles.inputfield}>
                <div className={styles.row}>
                  <input
                    className={styles.input1}
                    type="text"
                    placeholder="First Name*"
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                    required
                  />
                  <input
                    className={styles.input2}
                    type="text"
                    placeholder="Last Name*"
                    value={values.lastname}
                    onChange={handleChange("lastname")}
                    required
                  />
                </div>
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
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Repeat Password*"
                  value={values.confirmpassword}
                  onChange={handleChange("confirmpassword")}
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
                  <p className={styles.txt6}> Submit</p>
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

export default Signup;
