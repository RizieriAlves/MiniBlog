import React from "react";
import styles from "./User.module.css";
import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import classNames from "classnames";

function User() {
  const [login, setLogin] = useState(true);

  const [transicao, setTransicao] = useState(false);

  const toggle = async () => {
    setTransicao(true);
    setTimeout(() => {
      setTransicao(false);
      setLogin(!login);
    }, 1800);
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.container_border, {
          [styles.bg_gray]: transicao,
        })}
      >
        {login ? (
          <>
            <div
              className={classNames(
                styles.container_login,
                styles.container_div,
                {
                  [styles.container_right]: transicao,
                  [styles.transition_white]: transicao,
                }
              )}
            >
              <Login />
            </div>
            <div
              className={classNames(
                styles.container_grey,
                styles.container_div,
                {
                  [styles.container_left]: transicao,
                  [styles.transition_grey]: transicao,
                }
              )}
            >
              <h2>Não possui registro?</h2>
              <button
                className={styles.button}
                onClick={() => {
                  toggle();
                }}
              >
                Cadastre-se
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={classNames(
                styles.container_grey,
                styles.container_div,
                {
                  [styles.container_right]: transicao,
                  [styles.transition_grey]: transicao,
                }
              )}
            >
              <h2>Possui cadastro?</h2>
              <button
                className={styles.button}
                onClick={() => {
                  toggle();
                }}
              >
                Fazer login
              </button>
            </div>
            <div
              className={classNames(
                styles.container_registro,
                styles.container_div,

                {
                  [styles.container_left]: transicao,
                  [styles.transition_white]: transicao,
                }
              )}
            >
              <Register toggle={toggle} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default User;
