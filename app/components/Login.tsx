'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <section className="login-main">
          <button onClick={() => signOut()}>SignOut</button>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="login-main">
          <button onClick={() => signIn()}>SignIn</button>
        </section>
      </>
    );
  }
}
