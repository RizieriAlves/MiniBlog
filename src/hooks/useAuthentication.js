import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [erro, setErro] = useState(null);

  //Cleanup. Limpar resquicios de funções.
  const [cancelled, setCancelled] = useState(false);
  //permite autenticação.
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      await signOut(auth);
    } catch (erro) {
      if (erro.message.includes("password")) {
        setErro("Senha Fraca !!");
      } else if (erro.message.includes("email-already")) {
        setErro("Email já cadastrado.");
      } else {
        setErro("Ocorreu um erro, por favor tente mais tarde");
      }
    }
  };

  const log = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErro("Usuário não encontrado");
      } else if (error.code === "auth/wrong-password") {
        setErro("Senha inválida");
      } else {
        setErro("Tente mais tarde");
      }
    }
  };

  const out = () => signOut(auth);

  //Deixa mais performatico.
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, erro, log, out };
};
