'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';

type TUseSearch<T> = {
  filteredData: Array<T>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

type PrimitiveType = string | number | number | null | undefined;

interface SearchProps<T> {
  data: Array<T>;
  searchBy: Array<
    {
      [K in keyof T]: T[K] extends PrimitiveType ? K : never;
    }[keyof T]
  >;
}

const useSearch = <T>({ data, searchBy }: SearchProps<T>): TUseSearch<T> => {
  const [inputValue, setInputValue] = useState('');
  // Debounced input value for delayed search triggering
  const debouncedInputValue = useDeferredValue(inputValue);

  const filterData = useCallback(
    (
      data: Array<T>,
      inputValue: string,
      searchBy: Array<keyof T>
    ): Array<T> => {
      // Split the input value into search words
      const searchWords = inputValue.toLowerCase().trim().split(' ');

      // Function to check if a word is part of the item's property
      const isWordInProperty = (word: string, itemProperty: string) => {
        return itemProperty.toLowerCase().includes(word);
      };

      // Filter the data based on the search criteria
      const filteredData = data.filter(item => {
        return searchWords.every(word => {
          return searchBy.some(property => {
            const itemProperty = item[property]?.toString() || '';
            return isWordInProperty(word, itemProperty);
          });
        });
      });

      return filteredData;
    },
    []
  );

  // Memoize the filtered data
  const filteredData = useMemo(
    () => filterData(data, debouncedInputValue, searchBy),
    [data, debouncedInputValue, searchBy, filterData]
  );

  return { filteredData, inputValue, setInputValue };
};

export { useSearch };
