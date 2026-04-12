const BASE_URL = "http://localhost:8080/api";

export default BASE_URL;

export interface Deck {
  id: string;
  name: string;
  cardCount?: number;
  createdAt?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: string;
  deckId: string;
}

export interface Progress {
  total: number;
  mastered: number;
  learning: number;
  due: number;
}

export async function fetchDecks(): Promise<Deck[]> {
  const res = await fetch(`${BASE_URL}/decks`);
  if (!res.ok) throw new Error("Failed to fetch decks");
  return res.json();
}

export async function fetchDeck(id: string): Promise<Flashcard[]> {
  const res = await fetch(`${BASE_URL}/deck/${id}`);
  if (!res.ok) throw new Error("Failed to fetch deck");
  // return res.json();
  const data = await res.json();
  return data.flashcards || [];
}

export async function fetchReviewSession(deckId: string): Promise<Flashcard[]> {
  const res = await fetch(`${BASE_URL}/review-session/${deckId}`);
  if (!res.ok) throw new Error("Failed to fetch review session");
  return res.json();
}

export async function submitReview(cardId: string, rating: "again" | "good" | "easy"): Promise<void> {
  const res = await fetch(`${BASE_URL}/review/${cardId}?rating=${rating}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to submit review");
}

export async function fetchProgress(deckId: string): Promise<Progress> {
  const res = await fetch(`${BASE_URL}/progress/${deckId}`);
  if (!res.ok) throw new Error("Failed to fetch progress");
  return res.json();
}

export async function uploadPdf(file: File): Promise<Deck> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/upload-pdf`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Failed to upload PDF");
  return res.json();
}
