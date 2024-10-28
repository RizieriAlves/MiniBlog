import React from "react";
import styles from "./NewPost.module.css";
import { useState } from "react";
import { FaImages } from "react-icons/fa6";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [erro, setErro] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  async function send(e) {
    e.preventDefault();

    setErro("");

    if (tags.length < 1) {
      alert("Informe pelo menos uma tag");
      return;
    }

    const tagsarray = tags.map((el) => {
      return el.toLowerCase();
    });

    await insertDocument({
      tagsarray,
      text,
      uid: user.uid,
      createdBy: user.displayName,
    });

    setTags([]);
    setText("");
    setTimeout(() => {
      navigate("/timeline");
    }, 1500);
  }

  function actualtag(e) {
    setTag(e.target.value);
  }

  function addTag(e) {
    e.preventDefault();
    if (tag != "") {
      let newtags = [];
      newtags.push(tag);
      newtags.push(...tags);
      setTags(newtags);
      setTag("");
    }
  }

  function removetag(index) {
    let newtags = tags.filter((el, i) => {
      if (i != index) {
        return true;
      } else {
        return false;
      }
    });
    setTags(newtags);
  }

  return (
    <div className={styles.container}>
      <h3>New Post</h3>
      <form onSubmit={send} className={styles.form}>
        <textarea
          type="text"
          name="text"
          id="text"
          required
          placeholder="Compartilhe, reclame ou digite o que estiver afim"
          maxLength="300"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <p>TAGS:</p>
        <div className={styles.tagmedia}>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tag}
            placeholder="Tags"
            onChange={actualtag}
          ></input>
          <button onClick={addTag} className={styles.addtag}>
            Add Tag
          </button>
        </div>
        {tags && (
          <div>
            <p className={styles.tags}>
              {tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className={styles.tag}
                    onClick={() => removetag(index)}
                  >
                    {tag}
                  </span>
                );
              })}
            </p>
          </div>
        )}
        {response.loading ? (
          <h3 className={styles.send}>Aguarde...</h3>
        ) : (
          <button type="submit" className={styles.send}>
            Enviar
          </button>
        )}
        {response.error && <p className={styles.erro}>{response.error}</p>}
      </form>
    </div>
  );
}

export default NewPost;
