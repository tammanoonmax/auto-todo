import React from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import AutoTodo from './components/AutoTodo/AutoTodo';
import { initialItems } from './components/AutoTodo/constants';

const App: React.FC = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <AutoTodo initialItems={initialItems} />
    </ChakraProvider>
  );
};

export default App;
