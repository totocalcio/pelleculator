import { createContext, Dispatch, SetStateAction } from 'react';

type typeContext = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};

const defaultContext: typeContext = {
  image: '',
  setImage: () => {},
};

export const ImageContext = createContext<typeContext>(defaultContext);
