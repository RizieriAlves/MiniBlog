import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Timeline.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";

function Timeline() {
  const [query, setQuery] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.searchform} onSubmit={search}>
        <input
          type="search"
          name="busca"
          id="busca"
          placeholder="Busque por tags"
          value={query}
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button>Pesquisar</button>
      </form>
      {posts && posts.length === 0 && (
        <div className={styles.nopost}>
          <p>Opa, ainda não temos nenhum Post</p>
          <Link to="/newpost">
            <h1 className={styles.newpost}>Criar Post </h1>
          </Link>
        </div>
      )}

      <div className={styles.posts}>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id} className={styles.post}>
                <h2 className={styles.user}>{post.createdBy}</h2>
                <h3>{post.text}</h3>
                <div className={styles.tagdate}>
                  <p className={styles.tags}>
                    Tags: {post.tagsarray.join(", ")}
                  </p>
                  <p className={styles.tags}>
                    {new Date(post.createdAt.seconds * 1000).toLocaleString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Timeline;
