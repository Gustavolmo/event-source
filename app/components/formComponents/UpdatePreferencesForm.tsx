'use client';
import {
  getUserPreferences,
  updateUserPreferences,
} from '@/app-library/DbControls';
import { UserPreferences } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingUi from '../LoadingUi';
import useDbQuery from '@/app/customHooks/useDbQuery';

export default function UpdatePreferencesForm(props: {
  doesRedirect: boolean;
  path?: string;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [seeEdit, setSeeEdit] = useState(false);
  const [rerenderClick, setRerenderClick] = useState<boolean>(false);
  const { dbData } = useDbQuery(getUserPreferences, null, rerenderClick);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    name: session?.user?.name,
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    additionalRemarks: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRerenderClick(!rerenderClick);
    setSeeEdit(false);
    updateUserPreferences(session?.user?.email, userPreferences);
    setUserPreferences({
      name: '',
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

  const toggleEdit = () => {
    setSeeEdit(!seeEdit);
  };

  if (status !== 'authenticated') {
    return (
      <div className="Loading-ui">
        <LoadingUi />
      </div>
    );
  }

  return (
    <>
      <h3>Your preferences</h3>
      <>
        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="inline-label-input">
            <p> Name Displayed : </p>

            {seeEdit ? (
              <input
                name="name"
                placeholder="Dietary Restrictions"
                onChange={handleOnChange}
                value={userPreferences.name ? userPreferences.name : 'n/a'}
                required
              />
            ) : (
              <p>
                <b>{dbData && String(dbData[0].name)}</b>
              </p>
            )}
          </div>

          <div className="inline-label-input">
            <p> Accessibility Needs : </p>

            {seeEdit ? (
              <input
                name="dietaryRestrictions"
                placeholder="Dietary Restrictions"
                onChange={handleOnChange}
                value={userPreferences.dietaryRestrictions}
                required
              />
            ) : (
              <p>
                <b>{dbData && String(dbData[0].accessibilityNeeds)}</b>
              </p>
            )}
          </div>

          <div className="inline-label-input">
            <p>Dietary Restrictions :</p>

            {seeEdit ? (
              <input
                name="accessibilityNeeds"
                placeholder="Accessibility Needs"
                onChange={handleOnChange}
                value={userPreferences.accessibilityNeeds}
                required
              />
            ) : (
              <p>
                <b> {dbData && String(dbData[0].dietaryRestrictions)}</b>
              </p>
            )}
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

          {seeEdit && (
            <button className="action-button absolute-button-top-right--second">
              Update
            </button>
          )}
        </form>
        <button
          className={
            seeEdit
              ? 'navbar__button absolute-button-top-right'
              : 'action-button absolute-button-top-right'
          }
          onClick={toggleEdit}
        >
          {seeEdit ? 'Cancel' : 'Edit'}
        </button>
      </>
    </>
  );
}
