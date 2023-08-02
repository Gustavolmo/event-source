'use client'
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react'
import UpdatePreferencesForm from '../formComponents/UpdatePreferencesForm';

export default function MyInfo() {
const {data: session} = useSession()

  return (
    <>
      <UpdatePreferencesForm doesRedirect={false} />
    </>
  )

}
