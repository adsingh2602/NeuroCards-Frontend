// const BASE_URL = "http://localhost:8080/api";
const BASE_URL = "https://neurocards-backend.onrender.com/api";

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
  lastReview?: string;
}

export interface Progress {
  total: number;
  mastered: number;
  learning: number;
  due: number;
}

//GET TOKEN
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

// FETCH DECKS
export async function fetchDecks(): Promise<Deck[]> {
  const res = await fetch(`${BASE_URL}/decks`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch decks");
  return res.json();
}

//FETCH SINGLE DECK
export async function fetchDeck(id: string): Promise<Flashcard[]> {
  const res = await fetch(`${BASE_URL}/deck/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch deck");

  const data = await res.json();
  return data.flashcards || [];
}

//REVIEW SESSION
export async function fetchReviewSession(deckId: string): Promise<Flashcard[]> {
  const res = await fetch(`${BASE_URL}/review-session/${deckId}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch review session");
  return res.json();
}

// SUBMIT REVIEW
export async function submitReview(
  cardId: string,
  rating: "again" | "good" | "easy"
): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/review/${cardId}?rating=${rating}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) throw new Error("Failed to submit review");
}

//FETCH PROGRESS
export async function fetchProgress(deckId: string): Promise<Progress> {
  const res = await fetch(`${BASE_URL}/decks/${deckId}/progress`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch progress");
  return res.json();
}

// UPLOAD PDF
export async function uploadPdf(file: File): Promise<Deck> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload-pdf`, {
    method: "POST",
    headers: getAuthHeaders(), // IMPORTANT
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload PDF");
  return res.json();
}

//DELETE DECK
export async function deleteDeck(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/decks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete deck");
}