'use server';
import React from 'react';
import UserInfo from '../components/addInfoComponents/userInfo';
import UserImage from '../components/UserImage';

export default async function UserPreferences() {
  return (
    <>
      <UserImage width={50} height={50} />
      <UserInfo />
    </>
  );
}
