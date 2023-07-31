'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className="navbar__button" onClick={() => signOut()}>
        SignOut
      </button>
    );
  } else {
    return (
      <button className="navbar__button" onClick={() => signIn()}>
        SignIn
      </button>
    );
  }
}
