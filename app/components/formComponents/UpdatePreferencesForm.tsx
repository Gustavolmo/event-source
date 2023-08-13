'use client';
import {
  getUserPreferences,
  updateUserPreferences,
} from '@/app-library/DbControls';
import { UserPreferences } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingUi from '../LoadingUi';
import useDbQuery from '@/app/customHooks/useDbQuery';
import Loading from '../Loading';

export default function UpdatePreferencesForm(props: {
  doesRedirect: boolean;
  path?: string;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [seeEdit, setSeeEdit] = useState(false);
  const [seeDiet, setSeeDiet] = useState(false);
  const [seeNeeds, setSeeNeeds] = useState(false);
  const [rerenderClick, setRerenderClick] = useState<boolean>(false);
  const { dbData, loading } = useDbQuery(
    getUserPreferences,
    session?.user?.email,
    rerenderClick
  );
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    name: '',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    additionalRemarks: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRerenderClick(!rerenderClick);
    setSeeEdit(false);
    setSeeNeeds(false);
    setSeeDiet(false);
    updateUserPreferences(session?.user?.email, userPreferences);
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

  const toggleDietInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSeeDiet(!seeDiet);
  };

  const toggleNeedsInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSeeNeeds(!seeNeeds);
  };

  const toggleEdit = () => {
    setSeeNeeds(false);
    setSeeDiet(false);
    setSeeEdit(!seeEdit);
  };

  if (loading) {
    return <LoadingUi />;
  }

  return (
    <>
      <h3  className='--marginB16px'>Your preferences</h3>
      <>
        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="inline-label-input">
            <p className='--maringRL'> Name Displayed</p>

            {seeEdit ? (
              <input
                name="name"
                placeholder="Name Display"
                onChange={handleOnChange}
                value={userPreferences.name ? userPreferences.name : ''}
                required
              />
            ) : (
              <p>
                <b>{dbData && String(dbData[0].name)}</b>
              </p>
            )}
          </div>

          <div className="inline-label-input">
            <p  className='--maringRL'> Dietary Restrictions</p>

            {seeEdit ? (
              <>
                <p className="--margin-left4px">?</p>
                <input
                  className="--margin-left4px"
                  type="checkbox"
                  onChange={toggleDietInput}
                />
                {seeDiet && (
                  <input
                    className="--margin-left4px"
                    name="dietaryRestrictions"
                    placeholder="Dietary Restrictions"
                    onChange={handleOnChange}
                    value={
                      userPreferences.dietaryRestrictions
                        ? userPreferences.dietaryRestrictions
                        : ''
                    }
                    required
                  />
                )}
              </>
            ) : (
              <p>
                <b>{dbData && String(dbData[0].dietaryRestrictions)}</b>
              </p>
            )}
          </div>

          <div className="inline-label-input">
            <p  className='--maringRL'>Accessibility Needs</p>

            {seeEdit ? (
              <>
                <p className="--margin-left4px">?</p>
                <input
                  className="--margin-left4px"
                  type="checkbox"
                  onChange={toggleNeedsInput}
                />

                {seeNeeds && (
                  <input
                    className="--margin-left4px"
                    name="accessibilityNeeds"
                    placeholder="Accessibility Needs"
                    onChange={handleOnChange}
                    value={
                      userPreferences.accessibilityNeeds
                        ? userPreferences.accessibilityNeeds
                        : ''
                    }
                    required
                  />
                )}
              </>
            ) : (
              <p>
                <b> {dbData && String(dbData[0].accessibilityNeeds)}</b>
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
