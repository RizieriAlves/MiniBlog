import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  startAt,
  endAt,
  getDocs,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if (search != null) {
          q = await query(
            collectionRef,
            where("tagsarray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            q = await query(
              collectionRef,
              orderBy("createdBy"),
              startAt(search),
              endAt(search + "\uf8ff")
            );
          }
        } else if (uid != null) {
          console.log(
            (q = await query(
              collectionRef,
              where("uid", "==", uid),
              orderBy("createdAt", "desc")
            ))
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    if (cancelled) return;
  }, []);

  return { documents, loading, error };
};