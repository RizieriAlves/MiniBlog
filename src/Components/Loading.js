import React from "react";
import styles from "./loading.module.css";
export default function Loading() {
  return (
    <div className={styles.loading}>
      <h2>Aguarde, carregando ...</h2>
    </div>
  );
}
