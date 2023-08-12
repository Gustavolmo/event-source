'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import LoadingUi from './LoadingUi';

export function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <LoadingUi />
    )
  }

  if (session) {
    return (
      <button className="navbar__button" onClick={() => signOut({ callbackUrl: '/' })}>
        SignOut
      </button>
    );
  } else {
    return (
      <button className="action-button" onClick={() => signIn()}>
        SignIn
      </button>
    );
  }
}
