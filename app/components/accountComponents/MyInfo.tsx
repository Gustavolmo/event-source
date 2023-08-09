'use client';
import React from 'react';
import UpdatePreferencesForm from '../formComponents/UpdatePreferencesForm';
import { signOut, useSession } from 'next-auth/react';
import { deleteUser } from '@/app-library/DbControls';

export default function MyInfo() {
  const { data: session, status } = useSession();

  const handleDeleteUser = () => {
    deleteUser(session?.user?.email);
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <UpdatePreferencesForm doesRedirect={false} />
      <section>
        <button onClick={handleDeleteUser} className="navbar__button">
          Delete Account
        </button>
      </section>
    </>
  );
}
