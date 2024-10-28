import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

//Cria um reducer para mudar vários states de uma vez de acordo com o estado do envio.
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };

    case "DELETED_DOC":
      return { loading: false, error: null };

    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection, id) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Recebe os dados do formulário e tenta fazero envio
  const deleteDocument = async (id) => {
    setCancelled(false);

    // Inicia processo de envio
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      //Se tudo der certo, informa que odocumento foi enviado
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
