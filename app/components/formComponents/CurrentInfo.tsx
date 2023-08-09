import { getUserPreferences } from '@/app-library/DbControls'
import useDbQuery from '@/app/customHooks/useDbQuery'
import React from 'react'

type Props = {
  rerenderClick: Boolean
}

export default function CurrentInfo({rerenderClick}: Props) {
  const {dbData} = useDbQuery(getUserPreferences, null, rerenderClick)
  

  return (
    <>
      <p>Current preferences</p>
      <p>Dietary Restrictions: {dbData && String(dbData[0].dietaryRestrictions)}</p>
      <p>Accessibility Needs: {dbData && String(dbData[0].accessibilityNeeds)}</p>
    </>
  )

}
