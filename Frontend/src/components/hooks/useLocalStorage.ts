import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };


  return [storedValue, setValue] as const;
}



// import { useState, useEffect, useCallback } from 'react';

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       // Remove 'cart' from localStorage
//       // window.localStorage.removeItem('cart');
//       const item = window.localStorage.getItem(key);
//       return item ? (JSON.parse(item) as T) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   });

//   // Update localStorage when storedValue changes
//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(storedValue));
//     } catch (error) {
//       console.error(`Error writing to localStorage key "${key}":`, error);
//     }
//   }, [key, storedValue]);

//   // Setter with support for function or direct value
//   const setValue = useCallback((value: T | ((val: T) => T)) => {
//     try {
//       setStoredValue(prev => {
//         const valueToStore = value instanceof Function ? value(prev) : value;
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         return valueToStore;
//       });
//     } catch (error) {
//       console.error(`Error setting localStorage key "${key}":`, error);
//     }
//   }, [key]);

//   // Optional remover
//   const remove = useCallback(() => {
//     try {
//       window.localStorage.removeItem(key);
//       setStoredValue(initialValue);
//     } catch (error) {
//       console.error(`Error removing localStorage key "${key}":`, error);
//     }
//   }, [key, initialValue]);

//   return [storedValue, setValue, remove] as const;
// }
