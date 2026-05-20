import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, firebaseReady } from "./firebase";
import type { AnalysisResult } from "./types";

const COLLECTION_NAME = "analysisResults";

export async function saveAnalysisResult(result: AnalysisResult): Promise<string | null> {
  if (!firebaseReady || !db) return null;

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...result,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function loadRecentAnalysisResults(maxCount = 10): Promise<AnalysisResult[]> {
  if (!firebaseReady || !db) return [];

  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"), limit(maxCount));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as AnalysisResult),
    id: doc.id,
  }));
}
