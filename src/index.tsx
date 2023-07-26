import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

const rootElement = document.getElementById('root')!; // Use non-null assertion operator

createRoot(rootElement).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
