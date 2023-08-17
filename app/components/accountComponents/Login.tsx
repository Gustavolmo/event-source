'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import LoadingUi from '../loadingComponents/LoadingUi';

export function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
    <div className='--with-margin-n-8px'>
    <LoadingUi />
    </div>
    )
  }

  if (session) {
    return (
      <button
        className="navbar__button"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
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
