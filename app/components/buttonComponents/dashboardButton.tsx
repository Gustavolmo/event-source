import React from 'react'

type Props = {
  selectionHandler: Function
  selection: string | null
  nameValue: string
}

export default function dashboardButton({selectionHandler, selection, nameValue}: Props) {
  return (
    <button
          onClick={(e) => selectionHandler(e)}
          className={
            selection === nameValue ? 'page-button--selected' : 'page-button'
          }
          name={nameValue}
        >
          {nameValue}
        </button>
  )
}
