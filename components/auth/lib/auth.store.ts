import { create } from "zustand";
import { Person, User } from "./auth.interface";

interface AuthState {
  token: string | null;
  username: User | null;
  person: Person | null;
  message: string | null;
  setToken: (token: string) => void;
  setPerson: (person: Person) => void;
  setUser: (username: User) => void;
  setMessage: (message: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  username: JSON.parse(localStorage.getItem("username") || "null"),
  estudiantes: JSON.parse(localStorage.getItem("estudiantes") || "[]"),
  estudianteSelected: null,
  person: JSON.parse(localStorage.getItem("person") || "null"),
  message: null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (username) => {
    localStorage.setItem("username", JSON.stringify(username));
    set({ username });
  },
  setPerson: (person) => {
    localStorage.setItem("person", JSON.stringify(person));
    set({ person });
  },
  setMessage: (message) => set({ message }),
  clearAuth: () => {
    localStorage.removeItem("token");
    set({ token: null, username: null, message: null });
  },
}));
