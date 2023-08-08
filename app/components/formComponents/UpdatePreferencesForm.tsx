'use client';
import { updateUserPreferences } from '@/app-library/DbControls';
import { UserPreferences } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import CurrentInfo from './CurrentInfo';

export default function UpdatePreferencesForm(props: {
  doesRedirect: boolean;
  path?: string;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [rerenderClick, setRerenderClick] = useState<boolean>(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    additionalRemarks: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRerenderClick(!rerenderClick);
    updateUserPreferences(session?.user?.email, userPreferences);
    setUserPreferences({
      dietaryRestrictions: '',
      accessibilityNeeds: '',
      additionalRemarks: '',
    });
    if (props.doesRedirect && props.path) {
      router.push(props.path);
    }
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserPreferences((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (status !== 'authenticated') {
    return (
      <div className="Loading-ui">
        <h1>'Loading...'</h1>
      </div>
    );
  }

  return (
    <>
      <CurrentInfo rerenderClick={rerenderClick} />

      <p>Update Preferences |MAKE THIS A TOGGLE|</p>
      <form className="create-event-form" onSubmit={handleSubmit}>
        <div className="inline-label-input">
          <label>Dietary Restrictions</label>
          <input
            name="dietaryRestrictions"
            placeholder="Dietary Restrictions"
            onChange={handleOnChange}
            value={userPreferences.dietaryRestrictions}
            required
          />
        </div>

        <div className="inline-label-input">
          <label>Accessibility Needs</label>
          <input
            name="accessibilityNeeds"
            placeholder="Accessibility Needs"
            onChange={handleOnChange}
            value={userPreferences.accessibilityNeeds}
            required
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
      </form>
    </>
  );
}
