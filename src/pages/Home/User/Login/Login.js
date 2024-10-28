import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../../../context/AuthContext";
import { useAuthentication } from "../../../../hooks/useAuthentication";

import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, log, erro } = useAuthentication();
  const { user, loadingUser, setLoadingUser } = useAuthValue();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    async function login() {
      await log(email, password);
      if (!loadingUser) {
        navigate("/timeline");
      }
    }
    console.log(login());
  };
  console.log(user);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            name="email"
            id="email"
            autoComplete="off"
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            name="senha"
            id="senha"
          />
        </label>
        {erro && <p>{erro}</p>}
        <button className={styles.button}>Entrar</button>
      </form>
    </>
  );
}

export default Login;
