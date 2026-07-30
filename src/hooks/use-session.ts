import { useEffect, useState } from "react";

const KEY = "sentinelai-session";

export type Session = { login: string; name: string; avatarInitials: string } | null;

export function getSession(): Session {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Session) : null;
}

export function signInDemo() {
  window.localStorage.setItem(
    KEY,
    JSON.stringify({ login: "maya-okafor", name: "Maya Okafor", avatarInitials: "MO" }),
  );
}

export function signOutDemo() {
  window.localStorage.removeItem(KEY);
}

/** Client-side demo session. Swap for real GitHub OAuth when the backend is connected. */
export function useSession() {
  const [session, setSession] = useState<Session>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
  }, []);

  return { session, ready, setSession };
}
