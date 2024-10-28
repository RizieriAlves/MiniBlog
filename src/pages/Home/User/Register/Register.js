import React from "react";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import Loading from "../../../../Components/Loading";

function Register({ toggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState("");
  const [erro, setErro] = useState("");

  //Importa dados do hook useAuthentication
  const { createUser, erro: authErro } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");
    setSuccess("");

    if (password !== confirmPassword) {
      setErro("As senhas não coincidem!");
      setTimeout(() => {
        setErro("");
      }, 2000);
      return;
    }

    const newuser = {
      name,
      email,
      password,
    };

    setLoading(true);
    const response = await createUser(newuser);
    setLoading(false);

    if (response?.erro) {
      setErro(authErro);
      return;
    } else {
      setErro("");
    }

    setSuccess("Registro efetuado com sucesso");
  };

  useEffect(() => {
    if (authErro) {
      setErro(authErro);
    }
  }, [authErro]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        {loading && <Loading />}
        <label>
          Nome:
          <input
            type="text"
            required={true}
            name="name"
            id="name"
            placeholder="Digite seu nome"
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            required
            name="email"
            id="email"
            autoComplete="off"
            placeholder="Digite seu email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            required
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </label>
        <label>
          Confirme a sua senha:
          <input
            type="password"
            required
            name="confirm"
            id="confirm"
            placeholder="Confirme sua senha"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
        </label>
        {erro && <p className={styles.erro}>{erro}</p>}
        {success && <p className={styles.sucess}>{success}</p>}
        <button className={styles.button}>Registrar</button>
      </form>
    </>
  );
}

export default Register;
