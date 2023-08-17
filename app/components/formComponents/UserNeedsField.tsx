import React from 'react';

type Props = {
  seeEdit: Boolean;
  seeField: Boolean;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  toggleInput: React.ChangeEventHandler<HTMLInputElement>;
  userPreferencesValue: string | null | undefined;
  dbDataValue: string | null | undefined;
  title: string;
  fieldName: string;
};

export default function UserNeedsField({
  seeEdit,
  seeField,
  handleOnChange,
  toggleInput,
  userPreferencesValue,
  dbDataValue,
  title,
  fieldName,
}: Props) {
  return (
    <div className='inline-label-input'>
      <p className="--maringRL">{title}</p>

      {seeEdit ? (
        <>
          <input
            className="--margin-left4px"
            type="checkbox"
            onChange={toggleInput}
          />






          {seeField && (
            <input
              className="--margin-left4px"
              name={fieldName}
              placeholder={title}
              onChange={handleOnChange}
              value={
                userPreferencesValue
                  ? userPreferencesValue
                  : ''
              }
              required
            />
          )}
        </>





      ) : (




        <p>
          <b>{dbDataValue}</b>
        </p>





      )}
    </div>
  );
}
