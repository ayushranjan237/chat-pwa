import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatScreen from './components/ChatScreen';

function App() {
  return (
    <ChakraProvider>
      <ChatScreen />
    </ChakraProvider>
  );
}

export default App;
