import React from 'react';

type Props = {
  text: string;
  checkedState: boolean;
  handleOnCheckBox: React.ChangeEventHandler<HTMLInputElement>;
  checkboxName: string;
  handleOnChange?: React.ChangeEventHandler<HTMLInputElement>;

  addDateInput: boolean;
  dateInputName?: string;
  dateInputValue?: string;

  addTimeInput: Boolean;
  timeInputName?: string;
  timeInputValue?: string;
};

export default function FormOfferingQuestions({
  checkedState,
  handleOnCheckBox,
  handleOnChange,
  text,
  checkboxName,
  dateInputName,
  dateInputValue,
  addDateInput,
  addTimeInput,
  timeInputName,
  timeInputValue,
}: Props) {
  return (
    <div className="form__offerings-alone">
      <div className="form__offerings">
        <input
          type="checkbox"
          name={checkboxName}
          checked={checkedState}
          onChange={handleOnCheckBox}
        />
        <b>{text}</b>
      </div>

      {checkedState && (
        <section className='className="--gap8px'>
          {addDateInput && checkedState && (
            <input
              type="date"
              name={dateInputName}
              onChange={handleOnChange}
              value={dateInputValue}
              required
            />
          )}

          {addTimeInput && (
            <input
              type="time"
              name={timeInputName}
              onChange={handleOnChange}
              value={timeInputValue}
              required
            />
          )}
        </section>
      )}
    </div>
  );
}
