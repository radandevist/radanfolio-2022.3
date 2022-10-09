import { useState, Dispatch, SetStateAction } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const isBrowser = ((): boolean => typeof window !== "undefined")();

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = isBrowser ? window.localStorage.getItem(key) : null;
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      // in next.js on the server, window  is not defined I'll make the error silent
      // if (error instanceof ReferenceError && error.message === "window is not defined") {
      //   return initialValue;
      // }
      console.log(error);// eslint-disable-line no-console
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);// eslint-disable-line no-console
    }
  };

  return [storedValue, setValue];
};
