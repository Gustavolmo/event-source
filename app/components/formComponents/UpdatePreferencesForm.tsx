'use client';
import {
  getUserPreferences,
  updateUserPreferences,
} from '@/app-library/DbControls';
import { UserPreferences } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingUi from '../loadingComponents/LoadingUi';
import useDbQuery from '@/app/customHooks/useDbQuery';
import UserInfoField from './UserInfoField';
import UserNeedsField from './userNeedsField';
import EditButton from '../buttonComponents/EditButton';

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
    name: session?.user?.name,
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    additionalRemarks: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
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

  if (loading) return <LoadingUi />;

  return (
    <>
      <h3 className="--marginB16px">Your preferences</h3>

      <form className="create-event-form">
        <UserInfoField
          seeEdit={seeEdit}
          handleOnChange={handleOnChange}
          userPreferencesValue={userPreferences.name}
          dbDataValue={dbData && String(dbData[0].name)}
          title={'Name Displayed'}
          fieldName={'name'}
        />

        <UserNeedsField
          seeEdit={seeEdit}
          seeField={seeDiet}
          handleOnChange={handleOnChange}
          toggleInput={toggleDietInput}
          userPreferencesValue={userPreferences.dietaryRestrictions}
          dbDataValue={dbData && String(dbData[0].dietaryRestrictions)}
          title="Diet Restrict."
          fieldName="dietaryRestrictions"
        />

        <UserNeedsField
          seeEdit={seeEdit}
          seeField={seeNeeds}
          handleOnChange={handleOnChange}
          toggleInput={toggleNeedsInput}
          userPreferencesValue={userPreferences.accessibilityNeeds}
          dbDataValue={dbData && String(dbData[0].accessibilityNeeds)}
          title="Access Needs"
          fieldName="accessibilityNeeds"
        />
      </form>

      <EditButton 
          seeEdit={seeEdit}
          toggleEdit={toggleEdit}
          handleSubmit={handleSubmit}
      />
    </>
  );
}
