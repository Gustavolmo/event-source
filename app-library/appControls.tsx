'use client'

export const localStorageCheck = (
  window: Window & typeof globalThis,
  localStorageItem: string | null,
  value: string
) => {
  return typeof window !== 'undefined'
    ? localStorageItem
      ? localStorageItem
      : value
    : value;
};
