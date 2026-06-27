import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const AUTH_STORAGE_KEY = "luxgen-google-user";

export const ADMIN_EMAIL = "luxgen.stup@gmail.com";

export type GoogleUser = {
  email: string;
  name: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isGoogleEmail(email: string) {
  const normalized = normalizeEmail(email);
  return normalized.endsWith("@gmail.com") || normalized.endsWith("@googlemail.com");
}

export function isAdminEmail(email: string) {
  return normalizeEmail(email) === ADMIN_EMAIL;
}

function readStoredUser(): GoogleUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as GoogleUser;
    return user?.email ? user : null;
  } catch {
    return null;
  }
}

function saveStoredUser(user: GoogleUser) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("luxgen-auth-change"));
}

function removeStoredUser() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("luxgen-auth-change"));
}

export function useGoogleAuth() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refreshUser = (nextUser = readStoredUser()) => {
      setUser(nextUser);
      setReady(true);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email) {
        const normalizedEmail = normalizeEmail(firebaseUser.email);

        if (!isGoogleEmail(normalizedEmail)) {
          void signOut(auth).catch(() => undefined);
          removeStoredUser();
          refreshUser(null);
          return;
        }

        const nextUser = {
          email: normalizedEmail,
          name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
        };

        saveStoredUser(nextUser);
        refreshUser(nextUser);
        return;
      }

      removeStoredUser();
      refreshUser(null);
    });

    const refreshStoredUser = () => refreshUser();

    window.addEventListener("storage", refreshStoredUser);
    window.addEventListener("luxgen-auth-change", refreshStoredUser);

    return () => {
      unsubscribeAuth();
      window.removeEventListener("storage", refreshStoredUser);
      window.removeEventListener("luxgen-auth-change", refreshStoredUser);
    };
  }, []);

  const login = useCallback((email: string, name?: string) => {
    const normalizedEmail = normalizeEmail(email);
    if (!isGoogleEmail(normalizedEmail)) {
      throw new Error("Use a valid Gmail account to continue.");
    }

    const nextUser = {
      email: normalizedEmail,
      name: name?.trim() || normalizedEmail.split("@")[0],
    };

    saveStoredUser(nextUser);
    setUser(nextUser);
  }, []);

  const loginWithUser = useCallback((nextUser: GoogleUser) => {
    const normalizedEmail = normalizeEmail(nextUser.email);
    if (!isGoogleEmail(normalizedEmail)) {
      throw new Error("Use a valid Gmail account to continue.");
    }

    const savedUser = {
      email: normalizedEmail,
      name: nextUser.name?.trim() || normalizedEmail.split("@")[0],
    };

    saveStoredUser(savedUser);
    setUser(savedUser);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth).catch(() => undefined);
    removeStoredUser();
    setUser(null);
  }, []);

  return {
    ready,
    user,
    login,
    loginWithUser,
    logout,
    isLoggedIn: Boolean(user),
    isAdmin: Boolean(user && isAdminEmail(user.email)),
  };
}
