'use client';
import { updateNewUserPreferences } from '@/app-library/DbControls';
import { UserPreferences } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import PathButton from '../PathButton';

export default function userInfo() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    dietaryRestrictions: 'none',
    accessibilityNeeds: 'none',
    additionalRemarks: 'none',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNewUserPreferences(session?.user?.email, userPreferences);
    router.push('/account');
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserPreferences((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h1>Hello {session?.user?.name}</h1>
      <p>Let's save your preferences for future reference</p>

      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="inline-label-input">
          <label>Dietary Restrictions</label>
          <input
            name="dietaryRestrictions"
            placeholder="Dietary Restrictions"
            onChange={handleOnChange}
            value={userPreferences.dietaryRestrictions}
          />
        </div>

        <div className="inline-label-input">
          <label>Accessibility Needs</label>
          <input
            name="accessibilityNeeds"
            placeholder="Accessibility Needs"
            onChange={handleOnChange}
            value={userPreferences.accessibilityNeeds}
          />
        </div>

        {/* <label>Additional Remarks</label>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          onChange={handleOnChange}
          value={userPreferences.additionalRemarks}
        ></textarea> */}

        <button className="page-button">Update Info</button>
        <PathButton
          path={'/account'}
          title={'Prefer not to say'}
          className={'page-button'}
        />
      </form>
    </>
  );
}
