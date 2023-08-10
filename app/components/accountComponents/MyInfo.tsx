'use client';
import React from 'react';
import UpdatePreferencesForm from '../formComponents/UpdatePreferencesForm';
import { signOut, useSession } from 'next-auth/react';
import { deleteUser } from '@/app-library/DbControls';
import Greeting from '../Greeting';

export default function MyInfo() {
  const { data: session, status } = useSession();

  const handleDeleteUser = () => {
    deleteUser(session?.user?.email);
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Greeting />
      <section className='event-card'>
        <UpdatePreferencesForm doesRedirect={false} />      
        <div className='delete-account'>
          <button onClick={handleDeleteUser} className="navbar__button absolute-button-bottom-left">
            Delete Account
          </button>
        </div>
      </section>
    </>
  );
}
