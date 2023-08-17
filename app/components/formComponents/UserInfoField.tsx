import { DbData, User, UserPreferences } from '@/app-types/types';
import React from 'react';

type Props = {
  seeEdit: Boolean;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  userPreferencesValue: string | null | undefined;
  dbDataValue: string | null | undefined;
  title: string;
  fieldName: string;
};

export default function UserInfoField({
  seeEdit,
  handleOnChange,
  userPreferencesValue,
  dbDataValue,
  title,
  fieldName,
}: Props) {
  return (
    <div className="inline-label-input">
      <p className="--maringRL">{title}</p>

      {seeEdit ? (
        <input
          name={fieldName}
          placeholder={title}
          onChange={handleOnChange}
          value={{ userPreferencesValue } ? String(userPreferencesValue) : ''}
          required
        />
      ) : (
        <p>
          <b>{dbDataValue}</b>
        </p>
      )}
    </div>
  );
}
