import { createContext } from 'react';

export const ImageContext = createContext(
  {} as {
    image: string;
    setImage: React.Dispatch<React.SetStateAction<string>>;
  },
);

console.log();
